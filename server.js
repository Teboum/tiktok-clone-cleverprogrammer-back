import express from "express";
import mongoose from "mongoose";

import Data from "./data.js";
import Videos from "./dbModel.js";

// app config

const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next();
});
// DB config
const dBUrl =
  "mongodb://admin:zWNM1iu2e9M0wuuB@cluster0-shard-00-00.d7ukm.mongodb.net:27017,cluster0-shard-00-01.d7ukm.mongodb.net:27017,cluster0-shard-00-02.d7ukm.mongodb.net:27017/tiktok?ssl=true&replicaSet=atlas-b63lhh-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(dBUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
// api endpoint
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/v1/posts", (req, res) => res.status(200).send(Data));

app.get("/v2/posts", (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/v2/posts", (req, res) => {
  const dbVideos = req.body;

  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listen
app.listen(port, () => console.log(`listening on port ${port}`));
