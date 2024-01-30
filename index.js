const express = require("express")
const bodyParser = require("body-parser")

const Mongo = require("./Database/Mongo.js")

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



app.post("/glider-tracking/gps", (req, res) => {
    const output = `Date: ${req.body.dateTime}
    Latitude: ${req.body.latitude}
    Longitude: ${req.body.longitude}
    Altitude ${req.body.altitude}
    Speed: ${req.body.speed}\n`
    console.log(output)
    res.send(output)
})


app.get("/glider-tracking/glider", (req, res) => {
    Mongo.getGlider(req.query.id)

})
app.post("/glider-tracking/glider", (req, res) => {
    Mongo.addGlider(req.body)
})


app.get("/glider-tracking/flight", (req, res) => {
    Mongo.getFlight(req.query.id)

})
app.post("/glider-tracking/flight", (req, res) => {
    Mongo.addFlight(req.body)
})












app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
