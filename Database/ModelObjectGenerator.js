
const generateLocation = (currentLocation) => {
    console.log("CURRENTLOCATION")
    console.log(currentLocation)

    return {
        date: currentLocation.date,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        altitude: currentLocation.altitude,
        speed: currentLocation.speed
    }
}

const generateAbsoluteBarometricAltitude = (altitude) => {
    console.log("ABSOLUTEBAR")
    console.log(altitude)

    return {
        date: altitude.date,
        absoluteAltitude: altitude.absoluteAltitude,
        absoluteAccuracy: altitude.absoluteAccuracy,
        absolutePrecision: altitude.absolutePrecision
    }
}

const generateRelativeBarometricAltitude = (altitude) => {
    console.log("RELATIVEBAR")
    console.log(altitude)

    return {
        date: altitude.date,
        relativeAltitude: altitude.relativeAltitude,
        relativePressure: altitude.relativePressure
    }
}

const generateGlider = (data) => {
    console.log("GLIDER DATA")
    console.log(data)
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
    console.log("FLIGHT DATA")
    console.log(data)
    console.log("ABOSLUTE")
    console.log(data.absoluteBarometricAltitudes)
    console.log(data.relativeBarometricAltitudes)

    return {
        id: data.id,
        name: data.name,
        glider: generateGlider(data.glider),
        dateOfFlight: data.dateOfFlight,
        locations: data.locations.map((location) => generateLocation(location)),
        absoluteBarometricAltitudes: data.absoluteBarometricAltitudes.map((absoluteAltitude) => generateAbsoluteBarometricAltitude(absoluteAltitude)),
        relativeBarometricAltitudes: data.relativeBarometricAltitudes.map((relativeAltitude) => generateRelativeBarometricAltitude(relativeAltitude))
    }
}

const generateThermal = (data) => {
    return {
        id: data.id,
        location: generateLocation(data.location),
        glider: generateGlider(data.glider),
        detectedOn: data.detectedOn
    }
}

module.exports = { generateGlider, generateFlight }