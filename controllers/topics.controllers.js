const { selectTopics } = require("../models/topics.models");

exports.getTopics = (req, res) => {
  selectTopics().then(({ rows }) => {
    res.status(200).send({ topics: rows });
  });
};
