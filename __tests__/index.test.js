const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");

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
        expect(body.msg).toBe("article does not exist");
      });
  });
});
