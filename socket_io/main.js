const {EventEmitter} = require("events")

const Player = new EventEmitter()

Player.on("shot",(name)=>{
    console.log(`${name} Player got injured`)
})

Player.on("dead",(name)=>{
    console.log(`${name} Player is Dead`)
})

Player.emit('dead', "fggfg")
Player.emit("shot","hghgh")

