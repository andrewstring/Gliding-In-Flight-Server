const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const Mongo = require("./Database/Mongo.js")
const { serverPort, mongoUri } = require("./Config.js")
const { runChangeStream } = require("./Database/ChangeStream.js")

const { initSocket } = require("./Socket.js")

const app = express()


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



// Main Endpoints

// Query parameter for glider.name
app.get("/glider-tracking/glider", async (req, res) => {
    try {
        const result = await Mongo.getGlider(req.query.name)
        res.send(result)
    } catch(e) {
        console.error(e)
        res.send(e)
    }
})

// Glider object in body of request
app.post("/glider-tracking/glider", async (req, res) => {
    try {
        const result = await Mongo.addGlider(req.body)
        res.send(result)
    } catch(e) {
        console.error(e)
        res.send(e)
    }
})

// Query parameter for glider.name and glider object in body of request
app.put("/glider-tracking/glider", async (req, res) => {
    try {
        const result = await Mongo.updateGlider(req.query.name, req.body)
        res.send(result)
    } catch(e) {
        console.error(e)
        res.send(e)
    }
})

// Glider object in body of request (deletes by glider.name)
app.delete("/glider-tracking/glider", async (req, res) => {
    try {
        const result = await Mongo.deleteGlider(req.body)
        res.send(result)
    } catch(e) {
        console.error(e)
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
        console.error(e)
        res.send(e)
    }
})

// Flight object in body of request
app.post("/glider-tracking/flight", async (req, res) => {
    try {
        const result = await Mongo.addFlight(req.body)
        res.send(result)
    } catch(e) {
        console.error(e)
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
        console.error(e)
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
        console.error(e)
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

// Get thermal within radius
app.get("/glider-tracking/thermal/radius", async (req, res) => {
    try {
        const result = await Mongo.getThermalRadius(req.query.lat, req.query.long)
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
        console.error(e)
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
        console.error(e)
        res.send(e)
    }
})


// Start express server
app.listen(serverPort, () => {
    console.log(`App listening on port ${serverPort}`)
    console.log("Connecting to database")

    try {
        (async () => {
            await mongoose.connect(mongoUri)
            console.log("Connected to mongodb database")
        })()
        runChangeStream()
        initSocket()
    } catch(e) {
        console.error(e)
    }

})
