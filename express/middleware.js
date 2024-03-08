const fs = require('fs');
const logger = (req,res,next)=>{
console.log(new Date())
fs.appendFileSync('./log.txt',`${new Date()}\n`)
next();
}

module.exports={
    logger
}