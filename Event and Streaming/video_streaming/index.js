const express = require("express");

const fileName = "./video.mp4";

const app = express();

const fs = require("fs");
const { stat, createReadStream } = fs;

const util = require("util");
const { promisify } = util;
const fileInfo = promisify(stat);

app.get("/", async (req, res) => {
  const { size } = await fileInfo(fileName);
  const range = req.headers.range;

  if (range) {
    let [start, end] = range.replace(/bytes=/, "").split("-");
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size - 1;
    res.writeHead(206, {
      "Content-type": "video/mp4",
      "Accetpt-ranges": "bytes",
      "Content-range": `bytes ${start}-${end}/${size}`,
    });
    createReadStream(fileName, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-type": "video/mp4",
    });
    createReadStream(fileName).pipe(res);
  }
});

app.listen(8080, () => {
  console.log("server started");
});
