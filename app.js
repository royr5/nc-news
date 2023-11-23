const express = require("express");
const app = express();
const { getTopics, getEndpoints } = require("./controllers/topics.controller");

const { getArticleComments } = require("./controllers/comments.controller");

const {
  getArticles,
  getSingleArticle,
  patchArticle,
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

app.patch("/api/articles/:article_id", patchArticle);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.all("*", handleFourOhFour);
app.use(handlePsqlErrors);
app.use(handleCustomErrors);

module.exports = app;
