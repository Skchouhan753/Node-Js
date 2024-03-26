// we an not directly use express server with socket.io
const htt = require("http")

const {Server} = require("socket.io")


const httpServer = htt.createServer((req,res)=>{
    if(req.url === '/'){
        res.end("this is home page")
    }
})

const socketServer = new Server(httpServer)

httpServer.listen(8080)

socketServer.on("connection",()=>{

})