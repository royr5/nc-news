const db = require("../db/connection");

exports.selectArticles = (id) => {
  if (id < 1 || id > 13) {
    return Promise.reject({ status: 404, msg: "article does not exist" });
  }
  return db.query(`SELECT * FROM articles WHERE article_id = $1`, [id]);
};
