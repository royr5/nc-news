const db = require("../db/connection");

exports.selectArticles = (query) => {
  let str = "";
  let arr = [];

  if (query) {
    str += "WHERE topic = $1";
    arr.push(query.topic);
  }

  return db.query(
    `SELECT articles.article_id,
  articles.title,
  articles.topic,
  articles.author,
  articles.created_at,
  articles.votes,
  articles.article_img_url,COUNT(comments.comment_id) AS comment_count FROM articles JOIN comments ON articles.article_id = comments.article_id ${str} GROUP BY articles.article_id ORDER BY articles.created_at DESC;`,
    arr
  );
};

exports.selectSingleArticle = (id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "path not found" });
      }
      return { rows };
    });
};

exports.changeVotesById = (id, votes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
      [votes, id]
    )
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "path not found" });
      }
      return { rows };
    });
};
