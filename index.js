const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const port = 3000

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
    const data = JSON.stringify(req.body)
    const output = `Date: ${data.dateTime}
    Latitude: ${data.latitude}
    Longitude: ${data.longitude}
    Altitude ${data.altitude}
    Speed: ${data.speed}`
    console.log(output)
    res.send(output)
})




app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
