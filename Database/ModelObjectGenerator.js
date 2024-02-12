
const generateLocation = (currentLocation) => {
    return {
        date: currentLocation.date,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        altitude: currentLocation.altitude,
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
        name: data.name,
        glider: generateGlider(data.glider),
        dateOfFlight: data.dateOfFlight,
        location: "jkl"
    }
}

module.exports = { generateGlider, generateFlight }