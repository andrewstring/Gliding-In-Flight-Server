const { MongoClient, ServerApiVersion } = require("mongodb")
const { Glider } = require("./Schema.js")



// CONFIG INFO
const uri = "mongodb+srv://andrew:abadwerd153@cluster0.gm1gb9u.mongodb.net/?retryWrites=true&w=majority"
const databaseName = "Cluster0"

// mongodb client
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationIssues: true
    }
})

const run = async () => {
    try {
        await client.connect()
        await client.db(databaseName).command({ ping: 1 })
        console.log("Pinged deployment. Successfully connected")
    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

const initGlider = async () => {
    try {
        await client.connect()
        const database = await client.db(databaseName)
        const collection = database.collection("glider")

        // Placeholder document for glider user
        const testGlider = {
            id: "JKL",
            location: {
                latitude: 52.001,
                longitude: 11.10101010101010
            },
            altitude: 10,
            speed: -52.0001
        }
        const result = await collection.insertOne(testGlider)



    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }
}


// const initThermal = async () => {
//     try {

//     }

// }


initGlider()