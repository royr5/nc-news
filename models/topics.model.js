const db = require("../db/connection");

const endpoints = require("../endpoints.json");

exports.selectTopics = () => {
  return db.query(`SELECT * FROM topics;`);
};

exports.selectEndpoints = () => {
  return endpoints;
};
