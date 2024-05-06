import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai"
import { z } from "zod"
import fields from "./fields.js"
import axios from 'axios';

const fieldNames = fields.map(field => field.field_name).join(", ");
const systemPrompt =
`
    You are an LLM that specializes in converting natural language queries to iDigBio queries in iDigBio query format. 
    You should use scientific names whenever possible. If there are multiple relevant scientificnames, search for them all. 
    
    Example output: rq = {"stateprovince":"Florida","scientificname":"anura"}
    You can search for multiple values within a field by separating the values with a comma. Single values should be a text string. 
    Example with multiple values for a single field: {"stateprovince":"Florida","scientificname":["anura","araneae"]}
    For example, if the user asks a question about Spiders, you should query for scientificname "Araneae".
    
    You can utilize the following fields in your query: "${fieldNames}". Consider the user's natural language input, take your time to determine the relevat fields to be used, and when you're ready
    generate the query.
`

const oai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ?? undefined,
    organization: process.env.OPENAI_ORG_ID ?? undefined
})

const client = Instructor({
    client: oai,
    mode: "TOOLS"
})

const OutputQueryFormatSchema = z.object({
    "associatedsequences": z.string().optional(),
    "barcodevalue": z.string().optional(),
    "basisofrecord": z.string().optional(),
    "catalognumber": z.string().optional(),
    "class": z.string().optional(),
    "collectioncode": z.string().optional(),
    "collectionid": z.string().optional(),
    "collectionname": z.string().optional(),
    "collector": z.string().optional(),
    "commonname": z.string().optional(),
    "continent": z.string().optional(),
    "country": z.string().optional(),
    "county": z.string().optional(),
    "datecollected": z.date().optional(),
    "datemodified": z.date().optional(),
    "earliestperiodorlowestsystem": z.string().optional(),
    "etag": z.string().optional(),
    "eventdate": z.string().optional(),
    "family": z.string().optional(),
    "fieldnumber": z.string().optional(),
    "genus": z.string().optional(),
    "geopoint": z.object({
        "latitude": z.number().optional(),
        "longitude": z.number().optional()
    }).optional(),
    "hasImage": z.boolean().optional(),
    "highertaxon": z.string().optional(),
    "infraspecificepithet": z.string().optional(),
    "institutioncode": z.string().optional(),
    "institutionid": z.string().optional(),
    "institutionname": z.string().optional(),
    "kingdom": z.string().optional(),
    "latestperiodorhighestsystem": z.string().optional(),
    "locality": z.string().optional(),
    "maxdepth": z.number().optional(),
    "maxelevation": z.number().optional(),
    "mediarecords": z.string().optional(),
    "mindepth": z.number().optional(),
    "minelevation": z.number().optional(),
    "municipality": z.string().optional(),
    "occurrenceid": z.string().optional(),
    "order": z.string().optional(),
    "phylum": z.string().optional(),
    "recordids": z.string().optional(),
    "recordnumber": z.string().optional(),
    "recordset": z.string().optional(),
    "scientificname": z.union([z.string(), z.array(z.string())]).optional(),
    "specificepithet": z.string().optional(),
    "stateprovince": z.union([z.string(), z.array(z.string())]).optional(),
    "typestatus": z.string().optional(),
    "uuid": z.string().optional(),
    "verbatimeventdate": z.string().optional(),
    "verbatimlocality": z.string().optional(),
    "version": z.number().optional(),
    "waterbody": z.string().optional(),
})

const queryGenOutput = z.object({
    "input": z.string().describe("This field should contain the user's original input verbatim."),
    "rq": OutputQueryFormatSchema.describe("This is the iDigBio Query format and should contain the query generated from the user's plain text input.")
})

const llm_response = await client.chat.completions.create({
    messages: [
        {
            role: "system",
            content: systemPrompt
        },
        {
            role: "user",
            content: "Which state in the US has the most bears?"
        }
    ],
    model: "gpt-4-turbo",
    response_model: {
        schema: queryGenOutput,
        name: "Output structure consisting of the original input and a query."
    }
})
console.log(JSON.stringify(llm_response))


let aggs = {}
await axios.post(`https://beta-search.idigbio.org/v2/search/records?rq=${JSON.stringify(llm_response.rq)}`).then((response) => {
    aggs = JSON.stringify(response.data.aggs.unique_scientific_names)
}).catch((error) => {
    console.log(error)
})
console.log(aggs)

const sysPrompt =
    `
        You are an LLM that answers general questions about Biodiversity on Earth.
        A different LLM is taking the user's natural language input and transforming that into a query. 
        You will receive the User's original question, the query used, as well as various aggregations about the data.
        Determine if an aggregation is relevant and would enhance your answer, and if so reference it in your response. 
        You should cite specific scientificnames and counts whenever possible. Preface all references with "According to iDigBio data". 
    `

const FinalResponse = z.object({
    response_text: z.string().describe("The body of text containing your reply that will be read by the user."),
})

const llm_response_final = await client.chat.completions.create({
    messages: [
        {
            role: "system",
            content: sysPrompt
        },
        {
            role: "user",
            content: `Original user question: ${llm_response.input}. Query used: ${JSON.stringify(llm_response.rq)} Aggregations from executed query: ${aggs}`
        }
    ],
    model: "gpt-3.5-turbo",
    response_model: {
        schema: FinalResponse,
        name: "Text response to user."
    }
})

console.log(llm_response_final)