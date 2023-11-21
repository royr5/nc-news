const { selectComments } = require("../models/comments.models");
const { selectArticles } = require("../models/articles.models");

exports.getArticleComments = (req, res, next) => {
  const id = req.params.article_id;

  Promise.all([selectComments(id), selectArticles(id)])
    .then((response) => {
        console.log(response)
      const comments = response[0];

      console.log(comments.rows);
      res.status(200).send(comments.rows);
    })
    .catch(next);
};
