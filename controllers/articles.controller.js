const {
  selectArticles,
  selectSingleArticle,
} = require("../models/articles.model");
const { selectTopics } = require("../models/topics.model");

exports.getArticles = (req, res, next) => {
  const topic = req.query.topic;

  Promise.all([selectArticles(topic), selectTopics()])
    .then(([articles, topics]) => {
      res.status(200).send({ articles });
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
