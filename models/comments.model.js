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
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({ status: 404, msg: "path not found" });
      }
      return { rows };
    });
};
