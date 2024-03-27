const express = require("express");

const { connection } = require("./config/config");

require("dotenv").config();

const cors = require("cors");

const { userRouter } = require("./routes/user.routes");

const { auth } = require("./middleware/auth.middleware");

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use(cors());

app.use("/",userRouter)

app.get("/home",auth,(req,res)=>{
  res.send("hello")
})

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`server is running at port ${PORT}`);
    console.log(`connected to mongoDB`);
  } catch (err) {
    console.log(err);
  }
});
