const { Glider, Flight, Thermal } = require("./Schema.js")
const { generateGlider, generateFlight, generateThermal } = require("./ModelObjectGenerator.js")
const { testFlight, testGlider } = require("./TestData.js")
const { mongoose } = require("mongoose")
const { GliderResponse, FlightResponse, ThermalResponse } = require("../ResponseCodes")
const { mileRadius } = require("../Config")


const getGlider = async (gliderName) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const result = await Glider.findOne({ name: gliderName })
        if (!result) {
            return {message: GliderResponse.UserDoesNotExist, data: null}
        }
        return {message: GliderResponse.UserExists, data: result}
    } catch(e) {
        console.error(e)
        return {message: GliderResponse.ErrorGettingUser, data: null}
    }
}

const addGlider = async (glider) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const exists = await Glider.findOne({ name: glider.name })
        if (!exists) {
            const result = await Glider.create(generateGlider(glider))
            return {message: GliderResponse.UserCreated, data: result}
        }
        return {message: GliderResponse.UserExists, data: glider}
    } catch(e) {
        console.error(e)
        return {message: GliderResponse.ErrorAddingUser, data: glider}
    }
}

const updateGlider = async (gliderName, glider) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const previousGlider = await Glider.findOneAndUpdate({ name: gliderName }, glider)
        if (!previousGlider) {
            return {message: GliderResponse.UserDoesNotExist, data: glider}
        }
        return {message: GliderResponse.UserUpdated, data: glider}
    } catch(e) {
        console.error(e)
        return {message: GliderResponse.ErrorUpdatingUser, data: glider}
    }
}

const deleteGlider = async (glider) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const deleteOperation = await Glider.deleteOne({ name: glider.name })
        if (deleteOperation.deletedCount < 1) {
            return {message: GliderResponse.UserDoesNotExist, data: glider}
        }
        return {message: GliderResponse.UserDeleted, data: glider}
    } catch(e) {
        console.error(e)
        return {message: GliderResponse.ErrorDeletingUser, data: glider}
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
        await result.populate("glider")
        return {message: FlightResponse.FlightExists, data: result}
    } catch(e) {
        console.error(e)
        return {message: FlightResponse.ErrorGettingFlight, data: null}
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
        return {message: FlightResponse.FlightExists, data: flight}
    } catch(e) {
        console.error(e)
        return {message: FlightResponse.ErrorAddingFlight, data: flight}
    }
}

const updateFlight = async (flightId, flight) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const previousFlight = await Flight.findOneAndUpdate({ id: flightId }, flight)
        if (!previousFlight) {
            return {message: FlightResponse.FlightDoesNotExist, data: flight}
        }
        return {message: FlightResponse.FlightUpdated, data: flight}
    } catch(e) {
        console.error(e)
        return {message: FlightResponse.ErrorUpdatingFlight, data: flight}
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
        return {message: FlightResponse.ErrorDeletingFlight, data: flight}
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
        await result.populate("glider")
        return {message: ThermalResponse.ThermalExists, data: result}
    } catch(e) {
        console.error(e)
        return {message: ThermalResponse.ErrorGettingThermal, data: null}
    }
}

const getThermalRadius = async (latitude, longitude) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        // Miles to decimal degrees conversion
        const degToMile = 69.2
        const radius = (1/69.2) * mileRadius
        const lowLatBoundary = parseFloat(latitude) - radius
        const upLatBoundary = parseFloat(latitude) + radius
        const lowLongBoundary = parseFloat(longitude) - radius
        const upLongBoundary = parseFloat(longitude) + radius
        const result = await Thermal.find({
            "location.latitude": {$gte: lowLatBoundary, $lte: upLatBoundary},
            "location.longitude": {$gte: lowLongBoundary, $lte: upLongBoundary}
        })
        if (!result.count) {
            return {message: ThermalResponse.NoThermalsFound, data: null}
        }
        for (thermal in result) {
            await thermal.populate("glider")
        }
        return {message: ThermalResponse.ThermalsFound, data: result}
    } catch(e) {
        console.error(e)
        return {message: ThermalResponse.ErrorGettingThermal, data: null}
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
        return {message: ThermalResponse.ErrorAddingThermal, data: thermal}
    }
}

const updateThermal = async (thermalId, thermal) => {
    try {
        if (mongoose.connection.readyState != 1) {
            console.error("Mongodb not connected")
            return {message: GeneralResponse.MongoDBIssue, data: null}
        }
        const previousThermal = await Thermal.findOneAndUpdate({ id: thermalId }, thermal)
        if(!previousThermal) {
            return {message: ThermalResponse.ThermalDoesNotExist, data: thermal}
        }
        return {message: ThermalResponse.ThermalUpdated, data: thermal}
    } catch(e) {
        console.error(e)
        return {message: ThermalResponse.ErrorUpdatingThermal, data: thermal}
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
        return {message: ThermalResponse.ErrorDeletingThermal, data: thermal}
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
    getThermal, getThermalRadius, addThermal, updateThermal, deleteThermal 
}