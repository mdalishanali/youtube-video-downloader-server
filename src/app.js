require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const ytdl = require("ytdl-core");
app.use(cors());

const port = process.env.PORT || 8080;
app.post("/download", async (req, res) => {
  const videoUrl = req.query.url;
  const v_id = await ytdl.getURLVideoID(videoUrl);
  const info = await ytdl.getInfo(videoUrl);
  const file = await ytdl.downloadFromInfo(info);
  let data = {
    url: "https://www.youtube.com/embed/" + v_id,
    file: file,
    info: info.formats.sort((a, b) => {
      return a.mimeType < b.mimeType;
    }),
  };
  return res.send(data);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log("Listening on port", port);
});
