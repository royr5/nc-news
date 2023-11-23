const {
  selectArticles,
  selectSingleArticle,
  changeVotesById,
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

exports.patchArticle = (req, res, next) => {
  const id = req.params.article_id;
  const votes = req.body.inc_votes;
  changeVotesById(id, votes)
    .then(({ rows }) => {
      res.status(200).send({ article: rows });
    })
    .catch(next);
};
