const fs = require("fs")

const readStream = fs.createReadStream("./db.json")
const writeStream = fs.createWriteStream("./output.json")

readStream.pipe(writeStream)