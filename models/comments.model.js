const db = require("../db/connection");

const users = require("../db/data/test-data/users");

exports.postCommentOnArticle = (id, newComment) => {
  const { body, username } = newComment;
  return db
    .query(
      `INSERT INTO comments (body, article_id, author) 
     VALUES ($1,$2,$3) 
     RETURNING *;`,
      [body, id, username]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.checkUserExists = (user) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [user])
   
};

exports.selectComments = (id) => {
  return db
    .query(
      `SELECT comments.comment_id,comments.votes,comments.created_at,articles.author,comments.body,articles.article_id FROM comments JOIN articles ON comments.article_id = articles.article_id WHERE articles.article_id = $1 ORDER BY comments.created_at DESC;`,
      [id]
    )
    .then(({ rows }) => {
      return rows;
    });
};
