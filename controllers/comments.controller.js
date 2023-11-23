const { selectSingleArticle } = require("../models/articles.model");
const {
  postCommentOnArticle,
  checkUserExists,
} = require("../models/comments.model");

exports.postComment = (req, res, next) => {
  const id = req.params.article_id;
  const newComment = req.body;
  const user = req.body.username;

  Promise.all([
    selectSingleArticle(id),
    postCommentOnArticle(id, newComment),
    checkUserExists(user),
  ])
    .then(([articles, articleComment, users]) => {
      res.status(201).send({ comment: articleComment });
    })
    .catch(next);
};
