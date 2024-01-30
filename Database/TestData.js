const { Glider, Flight } = require("./Schema.js")

const testGlider = [
    new Glider({
        id: "jkl0",
        name: "John",
        location: {
            latitude: 1223.11,
            longitude: 122.1
        },
        lastUpdate: (new Date()).getDate(),
        previousAltitude: 1223.2,
        altitude: 1121.1,
        absoluteAltitude: 122.1,
        relativeAltitude: 1181,
        speed: 123.1
    }),
    new Glider({
        id: "jkl1",
        name: "Marco",
        location: {
            latitude: 1223.11,
            longitude: 122.1
        },
        lastUpdate: (new Date()).getDate(),
        previousAltitude: 1223.2,
        altitude: 1121.1,
        absoluteAltitude: 122.1,
        relativeAltitude: 1181,
        speed: 123.1
    })
]

const testFlight = [
    new Flight({
        id: "JKL0",
        glider: testGlider[0],
        dateOfFlight: (new Date()).getDate(),
        flightData: [
            {
                latitude: 10.1,
                longitude: 21.1,
                altitude: 23.2,
                absoluteAltitude: 1290.1,
                relativeAltitude: 11.11,
                speed: 2355.1
            },
            {
                latitude: 10.1,
                longitude: 21.1,
                altitude: 23.2,
                absoluteAltitude: 1290.1,
                relativeAltitude: 11.11,
                speed: 2355.1
            }
        ]
    }),
    new Flight({
        id: "JKL1",
        glider: testGlider[1],
        dateOfFlight: (new Date()).getDate(),
        flightData: [
            {
                latitude: 10.1,
                longitude: 21.1,
                altitude: 23.2,
                absoluteAltitude: 1290.1,
                relativeAltitude: 11.11,
                speed: 2355.1
            },
            {
                latitude: 10.1,
                longitude: 21.1,
                altitude: 23.2,
                absoluteAltitude: 1290.1,
                relativeAltitude: 11.11,
                speed: 2355.1
            }
        ]
    })
]

module.exports = { testGlider, testFlight }