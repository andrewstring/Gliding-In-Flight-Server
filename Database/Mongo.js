const { Glider, Flight, Thermal } = require("./Schema.js")
const { generateGlider, generateFlight } = require("./ModelObjectGenerator.js")
const { testFlight, testGlider } = require("./TestData.js")
const { mongoose } = require("mongoose")
const { GliderResponse, FlightResponse, ThermalResponse } = require("../ResponseCodes")


const getGlider = async (gliderId) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const result = await Glider.findOne({ id: gliderId })
        if (!result) {
            return {message: GliderResponse.UserDoesNotExist, data: null}
        }
        return {message: GliderResponse.UserExists, data: result}
    } catch(e) {
        console.error(e)
    }
}

const addGlider = async (glider) => {
    print("GLIDER")
    print(glider)
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const exists = await Glider.findOne({ id: glider.id })
        if (!exists) {
            const result = await Glider.create(generateGlider(glider))
            return {message: GliderResponse.UserCreated, data: result}
        }
        return {message: GliderResponse.UserExists, data: glider}
    } catch(e) {
        console.error(e)
    }
}

const updateGlider = async (glider) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const previousGlider = await Glider.findOneAndUpdate({ id: glider.id }, glider)
        if (!previousGlider) {
            return {message: GliderResponse.UserDoesNotExist, data: glider}
        }
        return {message: GliderResponse.UserUpdated, glider}
    } catch(e) {
        console.error(e)
    }
}

const deleteGlider = async (glider) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const deleteOperation = await Glider.deleteOne({ id: glider.id })
        if (deleteOperation.deletedCount < 1) {
            return {message: GliderResponse.UserDoesNotExist, data: glider}
        }
        return {message: GliderResponse.UserDeleted, data: glider}
    } catch(e) {
        console.error(e)
    }

}

const getFlight = async (flightId) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const result = await Flight.findOne({ id: flightId })
        if (!result) {
            return {message: FlightResponse.FlightDoesNotExist, data: flightId}
        }
        return {message: FlightResponse.FlightExists, data: result}
    } catch(e) {
        console.error(e)
    }
}

const addFlight = async (flight) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const exists = await Flight.findOne({ id: flight.id })
        if (!exists) {
            const result = await Flight.create(generateFlight(flight))
            return {message: FlightResponse.FlightCreated, data: result}
        }
        return {message: FlightResponse.FldightExists, data: flight}
    } catch(e) {
        console.error(e)
    }
}

const updateFlight = async (flight) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const previousFlight = await Flight.findOneAndUpdate({ id: flight.id }, flight)
        if (!previousFlight) {
            return {message: FlightResponse.FlightDoesNotExist, data: flight}
        }
        return {message: FlightResponse.FlightUpdated, data: flight}
    } catch(e) {
        console.error(e)
    }
}

const deleteFlight = async (flight) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const deleteOperation = await Flight.deleteOne({ id: flight.id })
        if (deleteOperation.deletedCount < 1) {
            return {message: FlightResponse.FlightDoesNotExist, data: flight}
        }
        return {message: FlightResponse.FlightDeleted, data: flight}
    } catch(e) {
        console.error(e)
    }
}

const getThermal = async (thermalId) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const result = await Thermal.findOne({ id: thermalId })
        if (!result) {
            return {message: ThermalResponse.ThermalDoesNotExist, data: thermalId}
        }
        return {message: ThermalResponse.ThermalExists, data: result}
    } catch(e) {
        console.error(e)

    }
}

const addThermal = async (thermal) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const exists = await Thermal.findOne({ id: thermal.id })
        if (!exists) {
            const result = await Thermal.create(generateThermal(thermal))
            return {message: ThermalResponse.ThermalCreated, data: result}
        }
        return {message: ThermalResponse.ThermalExists, data: thermal}
    } catch(e) {
        console.error(e)
    }
}

const updateThermal = async (thermal) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const previousThermal = await Thermal.findOneAndUpdate({ id: thermal.id }, thermal)
        if(!previousThermal) {
            return {message: ThermalResponse.ThermalDoesNotExist, data: thermal}
        }
        return {message: ThermalResponse.ThermalUpdated, data: thermal}
    } catch(e) {
        console.error(e)
    }
}

const deleteThermal = async (thermal) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const deleteOperation = await Thermal.deleteOne({ id: thermal.id })
        if (deleteOperation.deletedCount < 1) {
            return {message: ThermalResponse.ThermalDoesNotExist, data: thermal}
        }
        return {message: ThermalResponse.ThermalDeleted, data: thermal}
    } catch(e) {
        console.error(e)
    }
}

// FOR TESTING
const initBoth = async () => {
    await addGlider(testGlider[0])
    await addFlight(testFlight[0])
}


module.exports = {
    getGlider, addGlider, updateGlider, deleteGlider,
    getFlight, addFlight, updateFlight, deleteFlight,
    getThermal, addThermal, updateThermal, deleteThermal 
}