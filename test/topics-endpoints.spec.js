const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");

describe("Topics Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  it("GET /topics responds with 200 and all of the topics", () => {
    return supertest(app)
      .get("/topics")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        expect(res.body[0]).to.include.all.keys(
          "title",
          "zip_code",
          "event_id",
          "date_time_of_last_post",
          "date_published"
        );
      });
  });
});
