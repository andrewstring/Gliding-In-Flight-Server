
const generateLocation = (currentLocation) => {
    return {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        altitude: currentLocation.altitude,
        absoluteAltitude: currentLocation.absoluteAltitude,
        relativeAltitude: currentLocation.relativeAltitude,
        speed: currentLocation.speed
    }
}

const generateGlider = (data) => {
    return {
        id: data.id,
        name: data.name,
        currentLocation: generateLocation(data.currentLocation),
        currentUpdate: data.currentUpdate,
        lastLocation: generateLocation(data.lastLocation),
        lastUpdate: data.lastUpdate
    }
}

const generateFlight = (data) => {
    return {
        id: data.id,
        glider: generateGlider(data.glider),
        dateOfFlight: data.dateOfFlight
    }
}

module.exports = { generateGlider, generateFlight }