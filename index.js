const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const Mongo = require("./Database/Mongo.js")
const { mongoUri } = require("./Config.js")
const { GliderResponse } = require("./ResponseCodes.js")

const app = express()
const port = 3000

// Middleware
app.use(bodyParser.json())

// Initial request methods
app.get("/", (req, res) => {
    res.send("Hello World!")
})
app.get("/glider-tracking", (req, res) => {
    res.send("glider-tracking Response")
})
app.get("/datarec", (req, res) => {
    res.send("DataReceive Response")
})


// Tester Function
app.post("/glider-tracking/gps", (req, res) => {
    const output = `Date: ${req.body.dateTime}
    Latitude: ${req.body.latitude}
    Longitude: ${req.body.longitude}
    Altitude ${req.body.altitude}
    Speed: ${req.body.speed}\n`
    console.log(output)
    res.send(output)
})



// Main Endpoints


// Query parameter for glider.name
app.get("/glider-tracking/glider", async (req, res) => {
    try {
        const result = await Mongo.getGlider(req.query.name)
        res.send(result)
    } catch(e) {
        console.log(e)
        res.send(e)
    }
})

// Glider object in body of request
app.post("/glider-tracking/glider", async (req, res) => {
    try {
        const result = await Mongo.addGlider(req.body)
        res.send(result)
    } catch(e) {
        res.send(e)
    }
})

// Query parameter for glider.name and glider object in body of request
app.put("/glider-tracking/glider", async (req, res) => {
    try {
        const result = await Mongo.updateGlider(req.query.name, req.body)
        res.send(result)
    } catch(e) {
        res.send(e)
    }
})

// Glider object in body of request (deletes by glider.name)
app.delete("/glider-tracking/glider", async (req, res) => {
    try {
        const result = await Mongo.deleteGlider(req.body)
        res.send(result)
    } catch(e) {
        res.send(e)
    }
})


// Query parameters for glider.name and flight.id (Need both to get flight)

// Query parameters for flight.id
app.get("/glider-tracking/flight", async (req, res) => {
    try {
        const result = await Mongo.getFlight(req.query.id)
        res.send(result)
    } catch(e) {
        res.send(e)
    }
})

// Flight object in body of request
app.post("/glider-tracking/flight", async (req, res) => {
    try {
        console.log("IN POST")
        const result = await Mongo.addFlight(req.body)
        res.send(result)
    } catch(e) {
        res.send(e)
    }
})

// Query parameters for flight.glider.name and flight.id and flight object in body of request

// Query parameters for flight.id and flight object in body of request
app.put("/glider-tracking/flight", async (req, res) => {
    try {
        const result = await Mongo.updateFlight(req.query.id, req.body)
        res.send(result)
    } catch(e) {
        res.send(e)
    }
})

// Flight object in body of request (deletes by flight.glider.name and flight.id)

// Flight object in body of request (deletes by flight.id)
app.delete("/glider-tracking/flight", async (req, res) => {
    try {
        const result = await Mongo.deleteFlight(req.body)
        res.send(result)
    } catch(e) {
        res.send(e)
    }
})

// Query parameter for glider.name and thermal.id (Need both to get thermal)

// Query parameter for thermal.id
app.get("/glider-tracking/thermal", async (req, res) => {
    try {
        const result = await Mongo.getThermal(req.query.id)
        res.send(result)
    } catch(e) {
        console.error(e)
        res.send(e)
    }
})

// Thermal object in body of request
app.post("/glider-tracking/thermal", async (req, res) => {
    try {
        const result = await Mongo.addThermal(req.body)
        res.send(result)
    } catch(e) {
        console.error(e)
        res.send(e)
    }
})

// Query parameters for glider.name and thermal.id and thermal object in body of request

// Query parameters for thermal.id and thermal object in body of request
app.put("/glider-tracking/thermal", async (req, res) => {
    try {
        const result = await Mongo.updateThermal(req.query.id, req.body)
        res.send(result)
    } catch(e) {
        res.send(e)
    }
})

// Thermal object in body of request (deletes by thermal.glider.name and thermal.id)

// Thermal object in body of request (deletes by thermal.id)
app.delete("/glider-tracking/thermal", async (req, res) => {
    try {
        const result = await Mongo.deleteThermal(req.body)
        res.send(result)
    } catch(e) {
        res.send(e)
    }
})


// Start express server
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
    console.log("Connecting to database")
    try {
        (async () => {
            mongoose.connect(mongoUri)
            console.log("Connected to mongodb database")
        })()
    } catch(e) {
        console.error(e)
    }
    
})
