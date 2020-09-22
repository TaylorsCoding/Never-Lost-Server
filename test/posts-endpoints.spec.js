const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");

describe("Posts Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  it("GET /posts responds with 200 and all of the posts", () => {
    return supertest(app)
      .get("/posts")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        expect(res.body[0]).to.include.all.keys(
          "id",
          "content",
          "topic_id",
          "event_id",
          "date_modified",
          "date_published"
        );
      });
  });
});
