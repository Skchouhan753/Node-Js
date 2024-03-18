const express = require("express");
const { connection } = require("mongoose");
const { userRouter } = require("./routes/user.routes");

require("dotenv").config();

const app = express();

app.use(express.json())

app.use("/users",userRouter)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to DB");
    console.log("server started");
  } catch (err) {
    console.log(err);
  }
});
