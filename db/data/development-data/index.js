exports.articleData = require('./articles.js');
exports.commentData = require('./comments.js');
exports.topicData = require('./topics.js');
exports.userData = require('./users.js');


exports.index = {
    articleData: this.articleData,
    commentData: this.commentData,
    topicData: this.topicData,
    userData: this.userData,
  };