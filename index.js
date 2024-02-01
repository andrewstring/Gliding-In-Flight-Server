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
app.get("/glider-tracking/glider", async (req, res) => {
    try {
        const result = await Mongo.getGlider(req.query.id)
        res.send(result)
    } catch(e) {
        console.log(e)
        res.send(e)
    }
})
app.post("/glider-tracking/glider", async (req, res) => {
    try {
        const result = await Mongo.addGlider(req.body)
        res.send(result)
    } catch(e) {
        res.send(e)
    }
})


app.get("/glider-tracking/flight", (req, res) => {
    try {
        res.send(Mongo.getFlight(req.query.id))
    } catch(e) {
        res.send(e)
    }
})
app.post("/glider-tracking/flight", (req, res) => {
    try {
        res.send(Mongo.addFlight(req.body))
    } catch(e) {
        res.send(e)
    }
})



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
