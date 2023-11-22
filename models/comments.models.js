const db = require("../db/connection");

exports.selectComments = (id) => {
  return db.query(
    `SELECT comments.comment_id,comments.votes,comments.created_at,articles.author,comments.body,articles.article_id FROM comments JOIN articles ON comments.article_id = articles.article_id WHERE articles.article_id = $1 ORDER BY comments.created_at DESC;`,
    [id]
  );
};
