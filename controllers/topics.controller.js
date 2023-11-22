const { selectTopics, selectEndpoints } = require("../models/topics.model");

exports.getTopics = (req, res) => {
  selectTopics().then(({ rows }) => {
    res.status(200).send({ topics: rows });
  });
};

exports.getEndpoints = (req, res) => {
  const endpoints = selectEndpoints();
  res.status(200).send({ endpoints });
  return endpoints;
};
