const {
  selectArticles,
  selectSingleArticle,
} = require("../models/articles.model");
const { selectTopics, checkTopicExists } = require("../models/topics.model");

exports.getArticles = (req, res, next) => {
  const topic = req.query.topic;
  let arr = [selectArticles(topic)];

  if (topic) {
    arr.push(checkTopicExists(topic));
  }

  Promise.all(arr)
    .then(([articles, topics]) => {
      res.status(200).send({ articles: articles.rows });
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
