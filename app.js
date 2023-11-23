const express = require("express");
const app = express();
const { getTopics, getEndpoints } = require("./controllers/topics.controller");

const {
  getArticleComments,
  deleteCommentById,
} = require("./controllers/comments.controller");

const {
  getArticles,
  getSingleArticle,
} = require("./controllers/articles.controller");

const { postComment } = require("./controllers/comments.controller");

const { getUsers } = require("./controllers/users.controller");

const {
  handleCustomErrors,
  handlePsqlErrors,
  handleFourOhFour,
} = require("./errors");

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api", getEndpoints);

app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getSingleArticle);

app.post("/api/articles/:article_id/comments", postComment);

app.get("/api/articles/:article_id/comments", getArticleComments);


app.get("/api/users", getUsers);

app.delete("/api/comments/:comment_id", deleteCommentById);


app.all("*", handleFourOhFour);
app.use(handlePsqlErrors);
app.use(handleCustomErrors);

module.exports = app;
