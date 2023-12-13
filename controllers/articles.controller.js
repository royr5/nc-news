const {
  selectArticles,
  selectSingleArticle,
  changeVotesById,
} = require("../models/articles.model");
const { selectTopics, checkTopicExists } = require("../models/topics.model");

exports.getArticles = (req, res, next) => {
  const { topic, sort_by, order } = req.query;
  let arr = [selectArticles(topic, sort_by, order)];

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

exports.patchArticle = (req, res, next) => {
  const id = req.params.article_id;
  const votes = req.body.inc_votes;
  changeVotesById(id, votes)
    .then(({ rows }) => {
      res.status(200).send({ article: rows });
    })
    .catch(next);
};
