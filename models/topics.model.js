const db = require("../db/connection");

const endpoints = require("../endpoints.json");

exports.selectTopics = () => {
  return db.query(`SELECT * FROM topics;`);
};

exports.selectEndpoints = () => {
  return endpoints;
};

exports.checkTopicExists = (query) => {
  return db
    .query(`SELECT * FROM topics WHERE slug = $1;`, [query.topic])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "path not found" });
      }
      return { rows };
    });
};
