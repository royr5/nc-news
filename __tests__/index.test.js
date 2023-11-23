const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
require("jest-sorted");

const endpoints = require("../endpoints.json");

const {
  topicData,
  articleData,
  userData,
  commentData,
} = require("../db/data/test-data/index");
const { expect } = require("@jest/globals");

beforeEach(() => seed({ topicData, articleData, userData, commentData }));
afterAll(() => db.end());

describe("/api/topics", () => {
  test("GET:200 sends an array of topics objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const arr = response.body.topics;
        expect(arr.length).toBe(3);
        arr.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
  test("404: respond with an error message saying path is not found", () => {
    return request(app)
      .get("/api/topic")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path not found");
      });
  });
  test("GET:200 sends an object containing all endpoints that are available", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.endpoints).toMatchObject(endpoints);
      });
  });
});

describe("/api/articles", () => {
  test("GET:200 sends an array of articles objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const arr = response.body.articles;
        expect(arr.length).toBe(5);
        expect(arr).toBeSortedBy("created_at", { descending: true });
        arr.forEach((article) => {
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.title).toBe("string");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.author).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
        });
      });
  });
  test("GET:200 sends a single article", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const article = body.articles[0];
        const expectedArticle = {
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        };
        expect(Object.keys(article).length).toBe(8);
        expect(article).toMatchObject(expectedArticle);
      });
  });
  test("GET:404 sends an appropriate status and error message when given a valid but non-existent article id", () => {
    return request(app)
      .get("/api/articles/900")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path not found");
      });
  });
  test("GET:400 sends an appropriate status and error message when given an invalid article id", () => {
    return request(app)
      .get("/api/articles/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});

describe("/api/articles/:article_id/comments", () => {
  test("GET:200 sends all comments for an article", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const comments = body.comments;
        expect(comments.length).toBe(11);
        expect(comments).toBeSortedBy("created_at", { descending: true });
        comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.article_id).toBe("number");
        });
      });
  });
  test("GET:200 responds with an empty array if the article_id exists but there are no comments on that article", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
  test("GET:400 sends an appropriate status and error message when given an invalid article id", () => {
    return request(app)
      .get("/api/articles/banana/comments")

      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  test("GET:404 sends an appropriate status and error message when given a valid but non-existent article id", () => {
    return request(app)
      .get("/api/articles/900/comments")

      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path not found");
      });
  });

  test("POST:201 adds a new comment to an article in the db and sends the new comment back", () => {
    const newComment = {
      body: "Delicious crackerbreads",
      username: "icellusedkars",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        const arr = body.comment;
        expect(arr.length).toBe(1);
        arr.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(comment.body).toBe("Delicious crackerbreads");
          expect(comment.article_id).toBe(1);
          expect(comment.author).toBe("icellusedkars");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
        });
      });
  });
  test("POST:400 sends an appropriate status and error message if new comment has an invalid comment format", () => {
    const newComment = {
      body: "Delicious crackerbreads",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("POST:400 sends an appropriate status and error message when given an invalid article id", () => {
    const newComment = {
      body: "Delicious crackerbreads",
      username: "icellusedkars",
    };
    return request(app)
      .post("/api/articles/banana/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("POST:404 sends an appropriate status and error message when given a valid but non-existent article id", () => {
    const newComment = {
      body: "Delicious crackerbreads",
      username: "icellusedkars",
    };
    return request(app)
      .post("/api/articles/900/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path not found");
      });
  });
  test("POST:404 sends an appropriate status and error message when given a valid but non-existent user", () => {
    const newComment = {
      body: "Delicious crackerbreads",
      username: "testUser",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path not found");
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("PATCH:200 increments an articles votes by its article id and responds with the updated article", () => {
    const incrementVote = { inc_votes: 1 };
    return request(app)
      .patch("/api/articles/1")
      .send(incrementVote)
      .expect(200)
      .then(({ body }) => {
        const article = body.article[0];
        const expectedArticle = {
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 101,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        };
        expect(Object.keys(article).length).toBe(8);
        expect(article).toMatchObject(expectedArticle);
      });
  });
  test("PATCH:200 decrement an articles votes by its article id and respond with the updated article", () => {
    const incrementVote = { inc_votes: -1 };
    return request(app)
      .patch("/api/articles/1")
      .send(incrementVote)
      .expect(200)
      .then(({ body }) => {
        const article = body.article[0];
        const expectedArticle = {
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 99,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        };
        expect(Object.keys(article).length).toBe(8);
        expect(article).toMatchObject(expectedArticle);
      });
  });
  test("PATCH:400 sends an appropriate status and error message if votes object has invalid format", () => {
    const incrementVote = { banana: 1 };
    return request(app)
      .patch("/api/articles/1")
      .send(incrementVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("PATCH:400 sends an appropriate status and error message if inc_votes key's value is not a number", () => {
    const incrementVote = { inc_votes: "test" };
    return request(app)
      .patch("/api/articles/1")
      .send(incrementVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("PATCH:400 sends an appropriate status and error message when given an invalid article id", () => {
    const incrementVote = { inc_votes: 1 };
    return request(app)
      .patch("/api/articles/banana")
      .send(incrementVote)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test("PATCH:404 sends an appropriate status and error message when given a valid but non-existent article id", () => {
    const incrementVote = { inc_votes: 1 };
    return request(app)
      .patch("/api/articles/900")
      .send(incrementVote)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("path not found");

describe("/api/users", () => {
  test("GET:200 sends an array of users objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const arr = body.users;
        expect(arr.length).toBe(4);
        arr.forEach((user) => {
          expect(typeof user.username).toBe("string");
          expect(typeof user.name).toBe("string");
          expect(typeof user.avatar_url).toBe("string");
        });
      });
  });
});

describe("/api/comments/:comment_id", () => {
  test("DELETE: deletes the specified comment and sends no content back", () => {
    return request(app).delete("/api/comments/18").expect(204);
  });
  test("DELETE:404 responds with an appropriate status and error message when given a non-existent comment id", () => {
    return request(app)
      .delete("/api/comments/184")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("path not found");
      });
  });
  test("DELETE:400 responds with an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .delete("/api/comments/banana")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });

  describe("/api/comments/:comment_id", () => {
    test("DELETE: deletes the specified comment and sends no content back", () => {
      return request(app).delete("/api/comments/18").expect(204);
    });
    test("DELETE:404 responds with an appropriate status and error message when given a non-existent comment id", () => {
      return request(app)
        .delete("/api/comments/184")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe("path not found");
        });
    });
    test("DELETE:400 responds with an appropriate status and error message when given an invalid id", () => {
      return request(app)
        .delete("/api/comments/banana")
        .expect(400)
        .then((response) => {
          expect(response.body.msg).toBe("bad request");
        });
    });
  });
});
