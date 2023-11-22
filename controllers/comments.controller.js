const { selectComments } = require("../models/comments.models");
const { selectArticles } = require("../models/articles.models");

exports.getArticleComments = (req, res, next) => {
  const id = req.params.article_id;
  Promise.all([selectComments(id), selectArticles(id)])
    .then((response) => {
      const comments = response[0];
      res.status(200).send({ comments: comments.rows });
    })
    .catch(next);
};
