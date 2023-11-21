const db = require("../db/connection");

exports.selectComments = (id) => {
  return db
    .query(
      `SELECT comments.comment_id,comments.votes,comments.created_at,articles.author,comments.body,articles.article_id FROM comments JOIN articles ON comments.article_id = articles.article_id WHERE articles.article_id = $1;`,
      [id]
    )
    .then(({ rows }) => {
        if (!rows.length) {
            return Promise.reject({ status: 404, msg: "bad request" });
          }
      return { rows };
    });
};
