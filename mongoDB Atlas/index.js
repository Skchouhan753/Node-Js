const express = require("express");

const { connection, UserModel } = require("./config/db");
const PORT = 8080;

const mongoose = require("mongoose");

const app = express();

app.use(express.json()); //  whenever you are using json data you have to use this

app.get("/", (req, res) => {
  res.send("this is GET request");
});

// ================= POST Method ===============
app.post("/users", async (req, res) => {
  const payload = req.body;
  try {
    const user = new UserModel(payload);
    await user.save();
    res.status(200).send({ msg: "new user has been added" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err });
  }
});

// ================= GET Method =================
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send({ msg: "all users details", user: users });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// ================= Pagination ====================
// formule ==>> ( page * limit ) - limit = skip  ||  limit * ( page -1 ) = skip
app.get("/pagination", async (req, res) => {
  const { page } = req.query;
  const limitValue = 10;
  const skipValue = page * limitValue - limitValue;
  try {
    
    if (page) {
      const users = await UserModel.find().skip(skipValue).limit(limitValue);
      res.status(200).send({ msg: "users details on page", user: users });
    } else {
      const users = await UserModel.find();
      res.status(200).send({ msg: "all users details", user: users });
    }

  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// ================= get user by id =================
app.get("/users/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    const user = await UserModel.find({ _id: userID });
    res.status(200).send({ msg: "single users details", user: user });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// ============== find city -----method 1 ================
app.get("/city", async (req, res) => {
  const { city } = req.query;
  try {
    if (city) {
      const users = await UserModel.find({ city: city });
      res.status(200).send({ msg: "all users details", user: users });
    }
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// ============= find city -----method 2 ==============
app.get("/city2", async (req, res) => {
  try {
    const users = await UserModel.find(req.query);
    res.status(200).send({ msg: "all users details", user: users });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

//=============== PATCH Method (updating) =================
app.patch("/users/:userID", async (req, res) => {
  const { userID } = req.params;
  const updatPayload = req.body;
  try {
    await UserModel.findByIdAndUpdate({ _id: userID }, updatPayload);
    res.status(200).send({ msg: "details updated" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// ================== DELETE Method ====================
app.delete("/users/:userID", async (req, res) => {
  const { userID } = req.params;
  try {
    await UserModel.findByIdAndDelete({ _id: userID });
    res.status(200).send({ msg: "user deleted" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to DB");
    console.log(`Server is running at port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
