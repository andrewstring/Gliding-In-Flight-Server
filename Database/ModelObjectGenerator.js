const { mongoose } = require("mongoose")

const generateLocation = (currentLocation) => {
    console.log("Generating Location")
    return {
        date: currentLocation.date,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        altitude: currentLocation.altitude,
        speed: "speed" in currentLocation ? currentLocation.speed : null
    }
}

const generateAbsoluteBarometricAltitude = (altitude) => {
    return {
        date: altitude.date,
        absoluteAltitude: "absoluteAltitude" in altitude ? altitude.absoluteAltitude : null,
        absoluteAccuracy: "absoluteAccuracy" in altitude ? altitude.absoluteAccuracy : null,
        absolutePrecision: "absolutePrecision" in altitude ? altitude.absolutePrecision : null
    }
}

const generateRelativeBarometricAltitude = (altitude) => {
    return {
        date: altitude.date,
        relativeAltitude: "relativeAltitude" in altitude ? altitude.relativeAltitude : null,
        relativePressure: "relativePressure" in altitude ? altitude.relativePressure : null
    }
}

const generateGlider = (data) => {
    return {
        id: data.id,
        name: data.name,
        currentLocation: "currentLocation" in data ? generateLocation(data.currentLocation) : null,
        currentUpdate: "currentUpdate" in data ? data.currentUpdate: null,
        lastLocation: "lastLocation" in data ? generateLocation(data.lastLocation) : null,
        lastUpdate: "lastUpdate" in data ? data.lastUpdate : null
    }
}

const generateFlight = (data) => {
    return {
        id: data.id,
        name: data.name,
        locations: data.locations.map((location) => generateLocation(location)),
        absoluteBarometricAltitudes: data.absoluteBarometricAltitudes.map((absoluteAltitude) => generateAbsoluteBarometricAltitude(absoluteAltitude)),
        relativeBarometricAltitudes: data.relativeBarometricAltitudes.map((relativeAltitude) => generateRelativeBarometricAltitude(relativeAltitude)),
        gliderId: new mongoose.Types.ObjectId(data.gliderId),
        dateOfFlight: data.dateOfFlight,
        totalTime: data.totalTime,
        distanceTraveled: data.distanceTraveled,
        gpsHeightGained: data.gpsHeightGained,
        absoluteBarometricHeightGained: data.absoluteBarometricHeightGained,
        relativeBarometricHeightGained: data.relativeBarometricHeightGained,
        maxHeight: data.maxHeight,
        minLatitude: "minLatitude" in data ? data.minLatitude : null,
        maxLatitude: "maxLatitude" in data ? data.maxLatitude : null,
        minLongitude: "minLongitude" in data ? data.minLongitude : null,
        maxLongitude: "maxLongitude" in data ? data.maxLongitude : null,
    }
}

const generateThermal = (data) => {
    return {
        id: data.id,
        location: generateLocation(data.location),
        gliderId: new mongoose.Types.ObjectId(data.gliderId),
        detectedOn: data.detectedOn
    }
}

module.exports = { generateGlider, generateFlight, generateThermal }