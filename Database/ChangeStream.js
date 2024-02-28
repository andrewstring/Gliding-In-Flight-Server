const { MongoClient } = require("mongodb")
const { getThermal } = require("./Mongo.js")
const { mongoUri, mongoDBName } = require("../Config")
const { generateThermalWithGlider } = require("./ModelObjectGenerator.js")

const mongoClient = new MongoClient(mongoUri)

let changeStream

const runChangeStream = async (socket) => {
    try {
        const database = mongoClient.db(mongoDBName)
        const thermals = database.collection("thermals")
        changeStream = thermals.watch()

        for await (const change of changeStream) {
            if (socket) {
                let thermalId = change.fullDocument.id
                let thermal = generateThermalWithGlider((await getThermal(thermalId)).data)
                socket.emit("change", JSON.stringify(thermal))
            }
        }
        await changeStream.close()
    } catch(e) {
        console.error(e)
    }
    finally {
        await mongoClient.close()
    }
}

module.exports = { runChangeStream }