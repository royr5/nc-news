const { selectArticles } = require("../models/articles.models");

exports.getArticles = (req, res) => {
  const id = req.params.article_id;
  selectArticles(id).then((res) => {
    console.log(res.rows);
  });
};
