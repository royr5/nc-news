const db = require("../db/connection");

exports.selectArticles = () => {
  return db.query(`SELECT articles.article_id,
  articles.title,
  articles.topic,
  articles.author,  
  articles.created_at,
  articles.votes,
  articles.article_img_url, 
  COUNT(comments.comment_id) AS comment_count
  FROM articles
  JOIN comments ON articles.article_id = comments.article_id
  GROUP BY articles.article_id`);
};


