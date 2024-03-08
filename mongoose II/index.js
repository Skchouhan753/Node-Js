const express = require("express");

const { connection, UserModel } = require("./config/db");
const PORT = 8080;

const mongoose = require("mongoose");

const app = express();
app.use(express.json());  //  whenever you are using json data you have to use this

app.get("/", (req, res) => {
  res.send("this is GET request");
});


app.post('/users',async (req,res)=>{
    const payload = req.body;
    try{
        const user = new UserModel(payload)
        await user.save()
        res.status(200).send({"msg": "new user has been added"})
    }catch(err){
        console.log(err);
        res.status(400).send({"err":err})
    }
})


app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to DB");
    console.log(`Server is running at port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
