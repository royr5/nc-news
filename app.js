const express = require("express");
const app = express();
const { getTopics, getEndpoints } = require("./controllers/topics.controllers");
const { getArticles } = require("./controllers/articles.controller");
const { handleCustomErrors } = require("./errors");

app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticles);

app.use(handleCustomErrors);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "path not found" });
});

module.exports = app;