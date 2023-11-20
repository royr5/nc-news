const express = require("express");
const app = express();
const { getTopics, getEndpoints } = require("./controllers/topics.controllers");

app.get("/api/topics", getTopics);

app.get("/api", getEndpoints);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

module.exports = app;
