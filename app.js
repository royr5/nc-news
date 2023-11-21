const express = require("express");
const app = express();
const { getTopics, getEndpoints } = require("./controllers/topics.controllers");
const { getArticles } = require("./controllers/articles.controller");
const { getArticleComments } = require("./controllers/comments.controller");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleFourOhFour,
} = require("./errors");

app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);

app.get("/api/articles/:article_id", getArticles);
app.get("/api/articles/:article_id/comments", getArticleComments);

app.all("*", handleFourOhFour);
app.use(handlePsqlErrors);
app.use(handleCustomErrors);

module.exports = app;
