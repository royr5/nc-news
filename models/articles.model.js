const db = require("../db/connection");

const { checkComments } = require("./comments.model");

exports.selectArticles = (topic, sort_by = "created_at", order = "DESC") => {
  let str = "";
  let arr = [];

  if (topic) {
    str += "WHERE topic = $1";
    arr.push(topic);
  }

  const validOrder = ["ASC", "asc", "DESC", "desc"];
  const validSortBy = [
    "article_id",
    "title",
    "author",
    "topic",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count",
  ];
  if (!validOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  if (!validSortBy.includes(sort_by)) {
    return Promise.reject({ status: 404, msg: "column does not exist" });
  }

  return db.query(
    `SELECT articles.article_id,
      articles.title,
      articles.topic,
      articles.author,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
      COUNT(comments.comment_id) AS comment_count FROM articles 
      JOIN comments ON articles.article_id = comments.article_id ${str} 
      GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`,
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
    })
    .then(() => {
      return checkComments(id);
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
