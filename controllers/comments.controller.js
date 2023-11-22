const { selectComments } = require("../models/comments.model");
const { selectSingleArticle } = require("../models/articles.model");

exports.getArticleComments = (req, res, next) => {
  const id = req.params.article_id;

  Promise.all([selectComments(id), selectSingleArticle(id)])
    .then(([articleComments, articles]) => {
      res.status(200).send({ comments: articleComments });
    })
    .catch(next);
};
