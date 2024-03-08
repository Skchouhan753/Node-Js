//CJS method to import the module
const http = require("http");

const fs = require("fs");

// using http to create server
const server = http.createServer((req, res) => {
  // logic
  if (req.url == "/") {
    res.setHeader("Content-type", "text/html");
    res.end("<h1>this is the home page!</h1>");
  } else if (req.url == "/about") {
    res.end("this is about page");
  } else if (req.url == "/contact") {
    res.end("this is contact page");
  } else if (req.url == "/users") {
    // res.end('this is contact page')
    fs.readFile("./db.json", "utf-8", (err, data) => {
      err ? res.end(err) : res.end(data);
    });
  } else if (req.url == "/blogs" && req.method == "POST") {
    let str = "";
    req.on("data",(chunk)=>{
        str += chunk
    })
    req.on("end",()=>{
        console.log(str);
    })
    res.end("this is a post request");
  } else {
    res.end("404 page not found!");
  }
});

// running the server
server.listen(8080, () => {
  console.log("server is running at port 8080");
});
