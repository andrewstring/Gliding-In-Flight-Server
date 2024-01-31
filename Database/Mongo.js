const { mongoose } = require("mongoose")
const { Glider, Flight } = require("./Schema.js")
const { generateGlider } = require("./ModelObjectGenerator.js")
const { testFlight, testGlider } = require("./TestData.js")




// CONFIG INFO
const uri = "mongodb+srv://andrew:abadwerd153@cluster0.gm1gb9u.mongodb.net/?retryWrites=true&w=majority"

// mongodb client
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationIssues: true
//     }
// })
mongoose.connect(uri)

const run = async () => {
    try {
        const client = await mongoose.connect(uri)
    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

const getGlider = async (gliderId) => {
    try {
        const client = await mongoose.connect(uri)
        const result = await Glider.findOne({ id: gliderId })
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
        const client = await mongoose.connect(uri)
        const exists = await Glider.findOne({ id: glider.id })
        if (!exists) {
            console.log("GENERATED GLIDER")
            console.log(generateGlider(glider))
            const result = await Glider.create(generateGlider(glider))
        } else {
            throw Error("Glider already exists, cannot add")
        }
    } catch(e) {
        console.error(e)
    } finally {
        await client.close()
    }
        // const collection = database.collection("glider")
        // const exists = await Glider.findOne({ id: glider.id})
        // if (!exists) {
        //     // const result = await Glider.create({
        //     //     id: glider.id
        //     // })
        // } else {
        //     throw Error("Glider already exists, cannot add")
        // }

    // } catch(e) {
    //     console.error(e)
    // } finally {
    //     client.close()
    // }
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
        client.close()
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
        client.close()
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
        client.close()
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
        client.close()
    }
}

const deleteFlight = async () => {

}

const initBoth = async () => {
    await addGlider(testGlider[0])
    await addFlight(testFlight[0])
}


module.exports = { addGlider, getGlider, addFlight, getFlight }