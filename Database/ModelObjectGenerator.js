const { mongoose } = require("mongoose")

const generateLocation = (currentLocation) => {
    return {
        date: String(currentLocation.date),
        latitude: parseFloat(currentLocation.latitude),
        longitude: parseFloat(currentLocation.longitude),
        altitude: parseFloat(currentLocation.altitude),
        speed: "speed" in currentLocation ? parseFloat(currentLocation.speed) : null
    }
}

const generateAbsoluteBarometricAltitude = (altitude) => {
    return {
        date: String(altitude.date),
        absoluteAltitude: "absoluteAltitude" in altitude ? parseFloat(altitude.absoluteAltitude) : null,
        absoluteAccuracy: "absoluteAccuracy" in altitude ? parseFloat(altitude.absoluteAccuracy) : null,
        absolutePrecision: "absolutePrecision" in altitude ? parseFloat(altitude.absolutePrecision) : null
    }
}

const generateRelativeBarometricAltitude = (altitude) => {
    return {
        date: String(altitude.date),
        relativeAltitude: "relativeAltitude" in altitude ? parseFloat(altitude.relativeAltitude) : null,
        relativePressure: "relativePressure" in altitude ? parseFloat(altitude.relativePressure) : null
    }
}

const generateGlider = (data) => {
    return {
        id: String(data.id),
        name: String(data.name),
        currentLocation: "currentLocation" in data ? generateLocation(data.currentLocation) : null,
        currentUpdate: "currentUpdate" in data ? String(data.currentUpdate) : null,
        lastLocation: "lastLocation" in data ? generateLocation(data.lastLocation) : null,
        lastUpdate: "lastUpdate" in data ? String(data.lastUpdate) : null
    }
}

const generateFlight = (data) => {
    return {
        id: String(data.id),
        name: String(data.name),
        locations: data.locations.map((location) => generateLocation(location)),
        absoluteBarometricAltitudes: data.absoluteBarometricAltitudes.map((absoluteAltitude) => generateAbsoluteBarometricAltitude(absoluteAltitude)),
        relativeBarometricAltitudes: data.relativeBarometricAltitudes.map((relativeAltitude) => generateRelativeBarometricAltitude(relativeAltitude)),
        glider: new mongoose.Types.ObjectId(data.glider),
        dateOfFlight: String(data.dateOfFlight),
        totalTime: parseFloat(data.totalTime),
        distanceTraveled: parseFloat(data.distanceTraveled),
        gpsHeightGained: parseFloat(data.gpsHeightGained),
        absoluteBarometricHeightGained: parseFloat(data.absoluteBarometricHeightGained),
        relativeBarometricHeightGained: parseFloat(data.relativeBarometricHeightGained),
        maxHeight: parseFloat(data.maxHeight),
        minLatitude: "minLatitude" in data ? parseFloat(data.minLatitude) : null,
        maxLatitude: "maxLatitude" in data ? parseFloat(data.maxLatitude) : null,
        minLongitude: "minLongitude" in data ? parseFloat(data.minLongitude) : null,
        maxLongitude: "maxLongitude" in data ? parseFloat(data.maxLongitude) : null,
    }
}

const generateThermal = (data) => {
    return {
        id: String(data.id),
        location: generateLocation(data.location),
        glider: new mongoose.Types.ObjectId(data.glider),
        detectedOn: String(data.detectedOn)
    }
}

const generateThermalWithGlider = (data) => {
    return {
        id: String(data.id),
        location: generateLocation(data.location),
        glider: generateGlider(data.glider),
        detectedOn: String(data.detectedOn)
    }
}

const generateFlightWithGlider = (data) => {
    return {
        id: String(data.id),
        name: String(data.name),
        locations: data.locations.map((location) => generateLocation(location)),
        absoluteBarometricAltitudes: data.absoluteBarometricAltitudes.map((absoluteAltitude) => generateAbsoluteBarometricAltitude(absoluteAltitude)),
        relativeBarometricAltitudes: data.relativeBarometricAltitudes.map((relativeAltitude) => generateRelativeBarometricAltitude(relativeAltitude)),
        glider: generateGlider(data.glider),
        dateOfFlight: String(data.dateOfFlight),
        totalTime: parseFloat(data.totalTime),
        distanceTraveled: parseFloat(data.distanceTraveled),
        gpsHeightGained: parseFloat(data.gpsHeightGained),
        absoluteBarometricHeightGained: parseFloat(data.absoluteBarometricHeightGained),
        relativeBarometricHeightGained: parseFloat(data.relativeBarometricHeightGained),
        maxHeight: parseFloat(data.maxHeight),
        minLatitude: "minLatitude" in data ? parseFloat(data.minLatitude) : null,
        maxLatitude: "maxLatitude" in data ? parseFloat(data.maxLatitude) : null,
        minLongitude: "minLongitude" in data ? parseFloat(data.minLongitude) : null,
        maxLongitude: "maxLongitude" in data ? parseFloat(data.maxLongitude) : null,
    }
}

module.exports = { generateGlider, generateFlight, generateFlightWithGlider, generateThermal, generateThermalWithGlider }