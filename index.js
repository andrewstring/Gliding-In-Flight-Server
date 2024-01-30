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
app.get("/datasend", (req, res) => {
    res.send("DataSend Response")
})
app.get("/datarec", (req, res) => {
    res.send("DataReceive Response")
})



app.post("/datasend/gps", (req, res) => {
    const output = `Date: ${req.body.dateTime}
    Latitude: ${req.body.latitude}
    Longitude: ${req.body.longitude}
    Altitude ${req.body.altitude}
    Speed: ${req.body.speed}\n`
    console.log(output)
    res.send(output)
})


app.get("/datasend/glider", (req, res) => {

})
app.post("/datasend/glider", (req, res) => {
    Mongo.addGlider(req.body)
})

app.get("/datasend/flight", (req, res) => {

})
app.post("/datasend/flight", (req, res) => {
    Mongo.addFlight(req.body)
})












app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
