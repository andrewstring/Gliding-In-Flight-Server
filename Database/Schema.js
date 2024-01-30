const mongoose = require("mongoose")

// Schemas
const gliderSchema = new mongoose.Schema({
    id: String,
    location: {
        latitude: Number,
        longitude: Number
    },
    lastUpdate: Date,
    previousAltitude: Number,
    altitude: Number,

    //Barometric altitudes
    absoluteAltitude: Number,
    relativeAltitude: Number,

    speed: Number
})

const flightSchema = new mongoose.Schema({
    id: String,
    glider: gliderSchema,
    dateOfFlight: Date,
    flightData: [{
        latitude: Number,
        longitude: Number,
        altitude: Number,
        absoluteAltitude: Number,
        relativeAltitude: Number,
        speed: Number
    }]
})

// const thermalSchema = new mongoose.Schema({
//     id: String,
//     location: {
//         latitude: Number,
//         longitude: Number
//     },
//     startingAltitude: Number,
//     finishingAltitude: Number,
// })

// const adbsRecordSchema = new mongoose.Schema({

// })


const Glider = mongoose.model("Glider", gliderSchema)
const Flight = mongoose.model("Flight", flightSchema)


module.exports = { Glider, Flight }