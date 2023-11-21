const { selectArticles } = require("../models/articles.models");

exports.getArticles = (req, res) => {
  selectArticles().then(({ rows }) => {
    res.status(200).send({ articles: rows });
  });
};
