const express = require("express");

const jwt = require("jsonwebtoken");

const { connection } = require("./config/db");

const { userRouter } = require("./routes/user.routes");

const { auth } = require("./middleware/auth.middleware");

const { access } = require("./middleware/access.middleware");

const app = express();

app.use(express.json());

app.use("/users", userRouter);

// ==================== restricted routes ========================
// accessed by : customer, seller
app.get("/products", auth, access("buyer","seller"), (req, res) => {
    res.status(200)
});

// accessed by : customer, seller
app.get("/salesdata", auth, access("customer","seller"), (req, res) => {
    res.status(200)
});

// accessed by : seller
app.patch("/products/:id", auth, access("seller"), (req, res) => {
    res.status(200)
});

// accessed by : seller
app.delete("/product/:id", auth, access("seller"), (req, res) => {
    res.status(200)
});


app.get("/refresh",(req,res)=>{
    const refreshToken = req.headers.authorization?.split(" ")[1];
    jwt.verify(refreshToken,"school",(err, decoded)=>{
        if(decoded){
            const accessToken = jwt.sign({ userID: decoded.userID }, "masai",{expiresIn:30});
            res.json({accessToken});
        }else{
            res.json({err})
        }
    })
})

app.listen(8080, async () => {
  try {
    await connection;
    console.log("connected to server");
  } catch (err) {
    console.log(err);
  }
});
