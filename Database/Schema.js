const mongoose = require("mongoose")

// Schemas
const locationSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    altitude: {
        type: Number,
        default: null,
        required: false
    },
    absoluteAltitude: {
        type: Number,
        default: null,
        required: false
    },
    relativeAltitude: {
        type: Number,
        default: null,
        required: false
    },
    speed: {
        type: Number,
        default: null,
        required: false
    }
})

const gliderSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    currentLocation: {
        type: locationSchema,
        default: null,
        required: false
    },
    currentUpdate: {
        type: String,
        default: null,
        required: false
    },
    lastLocation: {
        type: locationSchema,
        default: null,
        required: false
    },
    lastUpdate: {
        type: String,
        default: null,
        required: false
    }
})

const flightSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    glider: {
        type: gliderSchema,
        required: true
    },
    dateOfFlight: {
        type: String,
        required: true
    },
    locations: [{
        type: locationSchema,
        default: null,
        required: false
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