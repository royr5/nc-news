const express = require("express");
const app = express();
const { getTopics, getEndpoints } = require("./controllers/topics.controllers");
const {
  getArticles,
  getSingleArticle,
} = require("./controllers/articles.controller");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleFourOhFour,
} = require("./errors");

app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getSingleArticle);

app.all("*", handleFourOhFour);
app.use(handlePsqlErrors);
app.use(handleCustomErrors);

module.exports = app;
