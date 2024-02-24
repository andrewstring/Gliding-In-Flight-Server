const mongoose = require("mongoose")

// Schemas
const locationSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
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
    speed: {
        type: Number,
        default: null,
        required: false
    }
})

const absoluteBarometricAltitudeSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    absoluteAltitude: {
        type: Number,
        default: null,
        required: false
    },
    absoluteAccuracy: {
        type: Number,
        default: null,
        required: false
    },
    absolutePrecision: {
        type: Number,
        default: null,
        required: false
    }
})

const relativeBarometricAltitudeSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    relativeAltitude: {
        type: Number,
        default: null,
        required: false
    },
    relativePressure: {
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
    }],
    absoluteBarometricAltitudes: [{
        type: absoluteBarometricAltitudeSchema,
        default: null,
        required: false
    }],
    relativeBarometricAltitudes: [{
        type: relativeBarometricAltitudeSchema,
        default: null,
        required: false
    }]
})

const thermalSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    location: {
        type: locationSchema,
        required: true
    },
    glider: {
        type: gliderSchema,
        required: true
    },
    detectedOn: {
        type: String,
        required: true
    }
})

const Glider = mongoose.model("Glider", gliderSchema)
const Flight = mongoose.model("Flight", flightSchema)
const Thermal = mongoose.model("Thermal", thermalSchema)


module.exports = { Glider, Flight, Thermal }