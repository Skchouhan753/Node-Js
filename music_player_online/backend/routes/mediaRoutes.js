const express = require("express");
const { getAll, create } = require("../controllers/mediaController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }
    if (!fs.existsSync("public/videos")) {
      fs.mkdirSync("public/videos");
    }
    cb(null, "public/videos");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== ".mkv" && ext !== ".mp4") {
      return cb(new Error("Only videos are allowed"));
    }
    cb(null, true);
  },
});

const videoRouter = express.Router();

videoRouter.get("/all", getAll);

videoRouter.post("/create", upload.array("videos", 5), create);

module.exports = {
  videoRouter,
};
