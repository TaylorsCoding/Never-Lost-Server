const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");

describe("Events Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  it("GET /events responds with 200 and all of the events", () => {
    return supertest(app)
      .get("/events")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        expect(res.body[0]).to.include.all.keys(
          "id",
          "title",
          "zip_code",
          "type",
          "description",
          "animal_id",
          "org_id",
          "date_time_of_last_post",
          "date_published"
        );
      });
  });
});
