const express = require("express");
const { connection } = require("./config/db");
const { videoRouter } = require("./routes/mediaRoutes");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", videoRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Server running at port 8080");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error starting server:", err);
  }
});
