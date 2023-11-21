const db = require("../db/connection");

exports.selectArticles = (id) => {
  let queryStr = ``;
  let validId = [];

  if (id) {
    queryStr += `SELECT * FROM articles WHERE article_id = $1`;
    validId.push(id);
  } else {
    queryStr += `SELECT articles.article_id,
    articles.title,
    articles.topic,
    articles.author,
    articles.created_at,
    articles.votes,
    articles.article_img_url,COUNT(comments.comment_id) AS comment_count FROM articles JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC;`;
  }

  return db.query(queryStr, validId).then(({ rows }) => {
    if (!rows.length) {
      return Promise.reject({ status: 404, msg: "path not found" });
    }
    return { rows };
  });
};
