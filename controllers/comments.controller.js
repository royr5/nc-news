const { selectSingleArticle } = require("../models/articles.model");
const {
  postCommentOnArticle,
  checkUserExists,
} = require("../models/comments.model");
const { selectComments } = require("../models/comments.model");

exports.postComment = (req, res, next) => {
  const id = req.params.article_id;
  const newComment = req.body;
  const user = req.body.username;

  postCommentOnArticle(id, newComment)
    .then((articleComment) => {
      res.status(201).send({ comment: articleComment });
    })
    .catch(next);
};

exports.getArticleComments = (req, res, next) => {
  const id = req.params.article_id;

  Promise.all([selectComments(id), selectSingleArticle(id)])
    .then(([articleComments, articles]) => {
      res.status(200).send({ comments: articleComments });
    })
    .catch(next);
};
