const { createServer } = require("http")
const { Server } = require("socket.io")
const { socketPort } = require("./Config.js")

const initSocket = async () => {
    const httpServer = createServer()
    const io = new Server()

    io.attach(httpServer)

    io.on("connection", (socket) => {
        console.log("\nClient connected\n")
    })

    httpServer.listen(socketPort)
    console.log(`Socket listening on port ${socketPort}`)
}

module.exports = { initSocket }