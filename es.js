import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai"
import { z } from "zod"
import fields from "./fields.js"
import mapping from "./mapping.js"
import axios from 'axios';


const oai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ?? undefined,
    organization: process.env.OPENAI_ORG_ID ?? undefined
})

const client = Instructor({
    client: oai,
    mode: "TOOLS"
})

const fieldNames = fields.map(field => field.field_name).join(", ");
const mapping_properties = Object.keys(mapping.properties).join(', ')

const extractAnalyzers = (properties) => {
    return Object.keys(properties).reduce((acc, key) => {
        const analyzer = properties[key].analyzer || 'no_analyzer';
        acc[key] = analyzer;
        return acc;
    }, {});
};
const test = extractAnalyzers(mapping.properties)
console.log(extractAnalyzers(mapping.properties))


const systemPrompt =
`
    You are a world class Biodiversity expert that specializes in converting natural language queries to ElasticSearch queries.
    
    Here's a structured example of what's expected:

    {
      "size": 0,
      "query": {
        "match": {
          "field_name": "some_value"
        }
      },
      "aggregations": {
        "sample_agg": {
          "terms": {
            "field": "field_to_aggregate",
            "size": 5
          }
        }
      }
    }
    
    Follow these explicit instructions:
    
    Include:
    1. A 'size' parameter to limit the number of results.
    2. A 'query' section specifying search conditions from the mapping ${mapping_properties}.
    3. An 'aggregations' section with detailed aggregations.
    
`

const MatchQuerySchema = z.object({
    match: z.record(z.string().superRefine((data, ctx) => {
        if (data in test) {
            ctx.addIssue({
                code: "custom",
                path: ["aggregations"],  // This specifies the path to the field the issue is related to
                message: `Field is not included in the mapping. Please choose from the list: ${mapping_properties}`
            });
        }
    }), z.union([z.string().toLowerCase(), z.array(z.string()), z.number(), z.boolean() ]))
});

const TermQuerySchema = z.object({
    term: z.record(z.string(), z.union([z.string().toLowerCase(), z.number(), z.boolean(), z.array(z.union([z.string(), z.number(), z.boolean()]))]))
});

const BoolQuerySchema = z.object({
    bool: z.object({
        must: z.array(z.lazy(() => QuerySchema)).optional(),
        should: z.array(z.lazy(() => QuerySchema)).optional(),
        must_not: z.array(z.lazy(() => QuerySchema)).optional(),
        filter: z.array(z.lazy(() => QuerySchema)).optional()
    })
});

const QuerySchema = z.union([
    MatchQuerySchema,
    TermQuerySchema,
    BoolQuerySchema
]);

const AggregationSchema = z.object({
    terms: z.object({
        field: z.string().describe(`must be a value from this list only: ${mapping_properties}. DO NOT USE .keyword`),
        size: z.number()
    })
})
const defaultAggregationObject = {
    sample_terms: {
        terms: {
            field: "scientificname",
            size: 5
        }
    }
}
const ElasticsearchQuerySchema = z.object({
    size: z.number().default(0),
    query: QuerySchema,
    aggregations: z.record(z.string(), AggregationSchema).superRefine((data, ctx) => {
        if (data===undefined || data===null) {
            ctx.addIssue({
                code: "custom",
                path: ["aggregations"],  // This specifies the path to the field the issue is related to
                message: `Aggregations are required, generate an aggregation relevant to the user's question. ${data}`
            });
        }
    })
});


const ESQuery = z.object({
    query_text: z.string().describe("ElasticSearch Query as a string.")
})

const queryGenOutput = z.object({
    "input": z.string().describe("This field should contain the user's original input verbatim."),
    "query": ESQuery.describe("ElasticSearch query targeting version 2.x.x.")
})

const llm_response = await client.chat.completions.create({
    messages: [
        {
            role: "system",
            content: systemPrompt
        },
        {
            role: "user",
            content: "Are there Galax in North Carolina?"
        }
    ],
    max_retries: 2,
    model: "gpt-3.5-turbo-16k",
    response_model: {
        schema: ElasticsearchQuerySchema,
        name: "Do not forget the aggs."
    }
})
console.log(llm_response)


let aggs = {}
await axios.post(`http://localhost:9200/fuzzy/records/_search?pretty=true`, llm_response, {headers: {'Content-Type': 'application/json'}}).then((response) => {
    console.log(response.data)
}).catch((error) => {
    console.log(error)
})


// const sysPrompt =
//     `
//         You are an LLM that answers general questions about Biodiversity on Earth.
//         A different LLM is taking the user's natural language input and transforming that into a query.
//         You will receive the User's original question, the query used, as well as various aggregations about the data.
//         Determine if an aggregation is relevant and would enhance your answer, and if so reference it in your response.
//         You should cite specific scientificnames and counts whenever possible. Preface all references with "According to iDigBio data".
//     `
//
// const FinalResponse = z.object({
//     response_text: z.string().describe("The body of text containing your reply that will be read by the user."),
// })
//
// const llm_response_final = await client.chat.completions.create({
//     messages: [
//         {
//             role: "system",
//             content: sysPrompt
//         },
//         {
//             role: "user",
//             content: `Original user question: ${llm_response.input}. Query used: ${JSON.stringify(llm_response.rq)} Aggregations from executed query: ${aggs}`
//         }
//     ],
//     model: "gpt-3.5-turbo",
//     response_model: {
//         schema: FinalResponse,
//         name: "Text response to user."
//     }
// })
//
// console.log(llm_response_final)