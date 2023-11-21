const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");

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
  test("GET:200 sends all comments for an article", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBe(11);
        body.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.article_id).toBe("number");
        });
      });
  });
  test("GET:404 sends an appropriate status and error message when given an invalid article id", () => {
    return request(app)
      .get("/api/articles/banana/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
  test.only("GET:200 responds with an empty array if the article_id exists but there are no comments on that article", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual([]);
      });
  });
});
