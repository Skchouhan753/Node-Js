const ws = require("ws")

const wss = new ws.WebSocketServer({port:8080})

wss.on("connection",()=>{
    console.log("A new connection has been stablished")
    console.log("connected to client")
})