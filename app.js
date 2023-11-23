const express = require("express");

const { getTopics, getEndpoints } = require("./controllers/topics.controller");

const {
  getArticleComments,
  deleteCommentById,
} = require("./controllers/comments.controller");

const {
  getArticles,
  getSingleArticle,
  patchArticle,
} = require("./controllers/articles.controller");

const { postComment } = require("./controllers/comments.controller");

const {
  handleCustomErrors,
  handlePsqlErrors,
  handleFourOhFour,
} = require("./errors");


const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getSingleArticle);


app.patch("/api/articles/:article_id", patchArticle);

app.post("/api/articles/:article_id/comments", postComment);


app.get("/api/articles/:article_id/comments", getArticleComments);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.all("*", handleFourOhFour);
app.use(handlePsqlErrors);
app.use(handleCustomErrors);

module.exports = app;
