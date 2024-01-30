const { MongoClient, ServerApiVersion } = require("mongodb")
const { Glider, Flight } = require("./Schema.js")
const { testFlight, testGlider } = require("./TestData.js")




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

const getGlider = async (gliderId) => {
    try {
        await client.connect()
        const database = await client.db(databaseName)
        const collection = database.collection("glider")
        const result = await collection.findOne({ id: gliderId })
        if (!result) {
            throw Error("Glider not found")
        }
        return result
    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

const addGlider = async (glider) => {
    try {
        await client.connect()
        const database = await client.db(databaseName)
        const collection = database.collection("glider")
        const exists = await collection.findOne({ id: glider.id})
        if (!exists) {
            const result = await collection.insertOne(testGlider[0])
        } else {
            throw Error("Glider already exists, cannot add")
        }
    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

const updateGlider = async (glider) => {
    try {
        await client.connect()
        const database = await client.db(databaseName)
        const collection = database.collection("glider")
        const updated = await collection.findOneAndUpdate({ id: glider.id }, glider)
        if (!updated) {
            throw Error("Glider does not exist, cannot update")
        }
    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

const deleteGlider = async () => {

}

const getFlight = async(flightId) => {
    try {
        await client.connect()
        const database = await client.db(databaseName)
        const collection = database.collection("flight")
        const result = await collection.findOne({ id: flightId })
        if (!result) {
            throw Error("Flight not found")
        }
        return result
    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

const addFlight = async (flight) => {
    try {
        await client.connect()
        const database = await client.db(databaseName)
        const collection = database.collection("flight")
        const exists = await collection.findOne({ id: flight.id})
        if (!exists) {
            const result = await collection.insertOne(flight)
        } else {
            throw Error("Flight already exists, cannot add")
        }
        
    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

const updateFlight = async (flight) => {
    try {
        await client.connect()
        const database = await client.db(databaseName)
        const collection = database.collection("flight")
        const updated = await collection.findOneAndUpdate({ id: flight.id }, flight)
        if (!updated) {
            throw Error("Glider does not exist, cannot update")
        }
    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

const deleteFlight = async () => {

}

const initBoth = async () => {
    await addGlider(testGlider[0])
    await addFlight(testFlight[0])
}


module.exports = { addGlider, addFlight }