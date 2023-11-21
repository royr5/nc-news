const { selectArticles } = require("../models/articles.models");

exports.getArticles = (req, res, next) => {
  const id = req.params.article_id;

  selectArticles(id)
    .then(({ rows }) => {
      res.status(200).send({ articles: rows });
    })
    .catch(next);
};
