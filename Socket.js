const io = require("socket.io")
const { socketPort } = require("./Config.js")



const initSocket = async () => {
    socketServer = io(socketPort)
    console.log(`Connected Socket Server on Port ${socketPort}`)
    socketServer.on("connection", socket => {
        console.log("\nConnected Client to Socket")
    })
}

module.exports = { initSocket }