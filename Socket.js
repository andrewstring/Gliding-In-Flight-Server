const { createServer } = require("http")
const { Server } = require("socket.io")
const { socketPort } = require("./Config.js")
const { runChangeStream } = require("./Database/ChangeStream.js")

const initSocket = async (callback) => {
    const httpServer = createServer()
    const io = new Server()

    io.attach(httpServer)

    io.on("connection", (socket) => {
        console.log("\nClient connected\n")
        runChangeStream(socket)
        socket.on("disconnect", () => {
            console.log("\nClient Disconnect\n")
        })
    })

    httpServer.listen(socketPort)
    console.log(`Socket listening on port ${socketPort}`)
}

module.exports = { initSocket }