const { Glider, Flight } = require("./Schema.js")
const { generateGlider } = require("./ModelObjectGenerator.js")
const { testFlight, testGlider } = require("./TestData.js")
const { mongoose } = require("mongoose")
const { GliderResponse } = require("../ResponseCodes")


const getGlider = async (gliderId) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.log("Mongodb not connected")
            return {message: GliderResponse.MongoDBIssue, data: null}
        }
        const result = await Glider.findOne({ id: gliderId })
        console.log(result)
        if (!result) {
            return {message: GliderResponse.UserDoesNotExist, data: null}
        }
        return {message: GliderResponse.UserExists, data: result}
    } catch(e) {
        console.error(e)
    }
}

const addGlider = async (glider) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.log("Mongodb not connected")
            return {message: GliderResponse.MongoDBIssue, data: null}
        }
        const exists = await Glider.findOne({ id: glider.id })
        if (!exists) {
            const result = await Glider.create(generateGlider(glider))
            return {message: GliderResponse.UserCreated, data: result}
        } else {
            return {message: GliderResponse.UserExists, data: null}
        }
    } catch(e) {
        console.error(e)
    }
}

const updateGlider = async (glider) => {
    try {
        const updated = await collection.findOneAndUpdate({ id: glider.id }, glider)
        if (!updated) {
            throw Error("Glider does not exist, cannot update")
        }
    } catch(e) {
        console.error(e)
    }
}

const deleteGlider = async () => {

}

const getFlight = async(flightId) => {
    try {
        const result = await collection.findOne({ id: flightId })
        if (!result) {
            throw Error("Flight not found")
        }
        return result
    } catch(e) {
        console.error(e)
    }
}

const addFlight = async (flight) => {
    try {
        const exists = await collection.findOne({ id: flight.id})
        if (!exists) {
            const result = await collection.insertOne(flight)
        } else {
            throw Error("Flight already exists, cannot add")
        }
    } catch(e) {
        console.error(e)
    }
}

const updateFlight = async (flight) => {
    try {
        const updated = await collection.findOneAndUpdate({ id: flight.id }, flight)
        if (!updated) {
            throw Error("Glider does not exist, cannot update")
        }
    } catch(e) {
        console.error(e)
    }
}

const deleteFlight = async () => {
    console.log(" ")
}

const initBoth = async () => {
    await addGlider(testGlider[0])
    await addFlight(testFlight[0])
}


module.exports = { addGlider, getGlider, addFlight, getFlight }