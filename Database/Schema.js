const mongoose = require("mongoose")

// Schemas
const gliderSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        latitude: {
            type: Number,
            default: null,
            required: false
        },
        longitude: {
            type: Number,
            default: null,
            required: false
        }
    },
    lastUpdate: {
        type: Date,
        default: (new Date()).getDate(),
        required: true
    },
    previousAltitude: {
        type: Number,
        default: null,
        required: false
    },
    altitude: {
        type: Number,
        default: null,
        required: false
    },

    //Barometric altitudes
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
        type: Date,
        default: (new Date()).getDate(),
        required: false
    },
    flightData: [{
        latitude: {
            type: Number,
            default: null,
            required: false
        },
        longitude: {
            type: Number,
            default: null,
            required: false
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