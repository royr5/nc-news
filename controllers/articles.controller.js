const {
  selectArticles,
  selectSingleArticle,
} = require("../models/articles.model");

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then(({ rows }) => {
      res.status(200).send({ articles: rows });
    })
    .catch(next);
};

exports.getSingleArticle = (req, res, next) => {
  const id = req.params.article_id;
  selectSingleArticle(id)
    .then(({ rows }) => {
      res.status(200).send({ articles: rows });
    })
    .catch(next);
};
