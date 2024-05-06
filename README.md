## idb-rag

This repo uses [instructor](https://github.com/instructor-ai/instructor-js) with the OpenAI [API](https://platform.openai.com/docs/overview) to 
coerce the LLM into generating queries. 

There are two versions, one generates queries in [iDigBio Query Format](https://github.com/iDigBio/idigbio-search-api/wiki/Query-Format)
and the other ElasticSearch 2.x.x queries.

### Config
Place a .env file containing your OAI API key at the root of the repository.

    OPENAI_API_KEY=

### Install

    bun install

### Run 

To run the version that generates iDigBio queries:
    
    bun index.js

To run the version that generates ElasticSearch queries:

    bun es.js