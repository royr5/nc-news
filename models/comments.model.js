const db = require("../db/connection");

exports.postCommentOnArticle = (id, newComment) => {
  const { body, author } = newComment;
  return db
    .query(
      `INSERT INTO comments (body, article_id, author) 
     VALUES ($1,$2,$3) 
     RETURNING *;`,
      [body, id, author]
    )
};
