// const express = require("express");

// const app = express();

// app.use(express.text())  // middleware for json use json()

// app.get("/", (req,res)=>{
// // res.end("this is home page") we can use this also but i express always use send instead of end.
// res.send("this is home page")  // if (req.url=='/ && req.method == "GET")
// })

// app.post("/",(req,res)=>{    // if (req.url=='/ && req.method == "POST")
//         console.log(req.body);
//     res.send('this is post method')
// })

// app.listen(8080,()=>{
//     console.log("Express server is running at port 8080")
// })

const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

app.get("/students", (req, res) => {
  // read the entire db
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.send({ error: err });
    } else {
      // filter out students from db
      const parsed_data = JSON.parse(data);
      console.log(parsed_data);
      // send the students details
      res.send({"students":parsed_data.students})
    }
  });
});

app.post("/students",(req,res)=>{
        // get the payload
        const payload = req.body;
        // read db.json
        fs.readFile("./db.json","utf-8",(err,data)=>{
            if(err){
                res.send({"error":err})
            }else{
                // filter out students array
                const parsed_data = JSON.parse(data);
                // push the new payload to the students array
                parsed_data.students.push(payload);
                // write the new data inside db.json
                fs.writeFileSync("./db.json",JSON.stringify(parsed_data),"utf-8")
                res.send("a new student has been added")
            }
        })
        
})

app.listen(8080, () => {
  console.log("Express server is running at port 8080");
});
