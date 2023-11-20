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
      .then(({body}) => {
        expect(body.msg).toBe("path not found");
      });
  });
});
