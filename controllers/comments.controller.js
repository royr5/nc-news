const { selectSingleArticle } = require("../models/articles.model");
const { postCommentOnArticle } = require("../models/comments.model");

exports.postComment = (req, res, next) => {
  const id = req.params.article_id;
  const newComment = req.body;

  Promise.all(selectSingleArticle(id), postCommentOnArticle(id, newComment))
    .then(({ rows }) => {
      res.status(201).send({ comment: rows });
    })
    .catch(next);
};
