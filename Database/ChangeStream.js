const { MongoClient } = require("mongodb")
const { mongoUri, mongoDBName } = require("../Config")

const mongoClient = new MongoClient(mongoUri)

let changeStream

const runChangeStream = async () => {
    try {
        const database = mongoClient.db(mongoDBName)
        const thermals = database.collection("thermals")

        changeStream = thermals.watch()

        console.log("Attached to MongoDB ChangeStream")

        for await (const change of changeStream) {
            console.log("CHANGE")
            console.log(change)
        }

        await changeStream.close()
    }
    finally {
        await mongoClient.close()
    }
}

module.exports = { runChangeStream }