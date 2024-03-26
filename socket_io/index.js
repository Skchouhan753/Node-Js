const htt = require("http")

const express = require("express")

const {Server} = require("socket.io")

const app = express()

const httpServer = htt.createServer(app)

const socketServer = new Server(httpServer)


app.get("/",(req,res)=>{
    res.send("hello world")
})

httpServer.listen(8080,()=>{
    console.log("server is running at port 8080")
})

socketServer.on("connection",(socket)=>{
    // logic
    socket.emit("greetings","hello everyone")

    socket.on("hey",(msg)=>{
        console.log(msg)
    })
})