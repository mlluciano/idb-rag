export default  {
        "date_detection" : false,
            "properties" : {
            "associatedsequences" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "barcodevalue" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "basisofrecord" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "bed" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "canonicalname" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "catalognumber" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "class" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "collectioncode" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "collectionid" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "collectionname" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "collector" : {
                "type" : "string"
            },
            "commonname" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "commonnames" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "continent" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "coordinateuncertainty" : {
                "type" : "float"
            },
            "country" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "countrycode" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "county" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "datasetid" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "datecollected" : {
                "type" : "date",
                    "format" : "strict_date_optional_time||epoch_millis"
            },
            "datemodified" : {
                "type" : "date",
                    "format" : "strict_date_optional_time||epoch_millis"
            },
            "dqs" : {
                "type" : "float"
            },
            "earliestageorloweststage" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "earliesteonorlowesteonothem" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "earliestepochorlowestseries" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "earliesteraorlowesterathem" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "earliestperiodorlowestsystem" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "etag" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "eventdate" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "family" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "fieldnumber" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "flags" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "formation" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "genus" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "geologicalcontextid" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "geopoint" : {
                "type" : "geo_point",
                    "lat_lon" : true,
                    "geohash" : true,
                    "geohash_prefix" : true
            },
            "group" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "hasImage" : {
                "type" : "boolean"
            },
            "hasMedia" : {
                "type" : "boolean"
            },
            "highertaxon" : {
                "type" : "string"
            },
            "highestbiostratigraphiczone" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "individualcount" : {
                "type" : "float"
            },
            "infraspecificepithet" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "institutioncode" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "institutionid" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "institutionname" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "kingdom" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "latestageorhigheststage" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "latesteonorhighesteonothem" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "latestepochorhighestseries" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "latesteraorhighesterathem" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "latestperiodorhighestsystem" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "lithostratigraphicterms" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "locality" : {
                "type" : "string"
            },
            "lowestbiostratigraphiczone" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "maxdepth" : {
                "type" : "float"
            },
            "maxelevation" : {
                "type" : "float"
            },
            "mediarecords" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "member" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "mindepth" : {
                "type" : "float"
            },
            "minelevation" : {
                "type" : "float"
            },
            "municipality" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "occurrenceid" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "order" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "phylum" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "recordids" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "recordnumber" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "recordset" : {
                "type" : "string",
                    "analyzer" : "keyword"
            },
            "scientificname" : {
                "type" : "string",
                    "analyzer" : "standard",
                "specificepithet" : {
                    "type" : "string",
                        "analyzer" : "keyword"
                },
                "startdayofyear" : {
                    "type" : "integer"
                },
                "stateprovince" : {
                    "type" : "string",
                        "analyzer" : "keyword"
                },
                "taxonid" : {
                    "type" : "string",
                        "analyzer" : "keyword"
                },
                "taxonomicstatus" : {
                    "type" : "string",
                        "analyzer" : "keyword"
                },
                "taxonrank" : {
                    "type" : "string",
                        "analyzer" : "keyword"
                },
                "typestatus" : {
                    "type" : "string",
                        "analyzer" : "keyword"
                },
                "uuid" : {
                    "type" : "string",
                        "analyzer" : "keyword"
                },
                "verbatimeventdate" : {
                    "type" : "string",
                        "analyzer" : "keyword"
                },
                "verbatimlocality" : {
                    "type" : "string"
                },
                "version" : {
                    "type" : "integer"
                },
                "waterbody" : {
                    "type" : "string",
                        "analyzer" : "keyword"
                }
            }
        },

}