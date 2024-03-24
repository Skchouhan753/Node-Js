const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const stream = fs.createReadStream("./db.json","utf-8")
  stream.on('data',function(chunks){
console.log(chunks)
const newData = JSON.parse(chunks)
res.json(newData)
  })
stream.on("end",()=>{
    
})
});

app.listen(8080, () => {
  console.log("server started");
});


// npx autocannon http://localhost:8080/data

// const writableStream = fs.createWriteStream("./text.txt")
// writableStream.write("hello world\n")
// writableStream.end("writing is done")

//https://medium.com/@selieshjksofficial/streamlining-large-file-uploads-with-chunk-uploads-in-node-js-and-express-js-e40d00c26c2d