const { MongoClient } = require("mongodb")
const { getGlider } = require("./Mongo.js")
const { mongoUri, mongoDBName } = require("../Config")
const { generateThermal } = require("./ModelObjectGenerator.js")

const mongoClient = new MongoClient(mongoUri)

let changeStream

const runChangeStream = async (socket) => {
    try {
        const database = mongoClient.db(mongoDBName)
        const thermals = database.collection("thermals")

        changeStream = thermals.watch()

        console.log("Attached to mongodb change stream")

        for await (const change of changeStream) {
            if (socket) {
                console.log("CHANGE")
                console.log(change)
                let thermal = generateThermal(change.fullDocument)
                let glider = await getGlider(thermal.glider)
                console.log("GLIDER")
                console.log(glider)
                if (glider != null) {
                    thermal.glider = glider.data
                } else {
                    thermal.glider = null
                }
                console.log("ThErMaL")
                console.log(thermal)
                socket.emit("change", thermal)
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