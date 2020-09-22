const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");

describe("Animals Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  it("GET /animals responds with 200 and all of the animals", () => {
    return supertest(app)
      .get("/animals")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        expect(res.body[0]).to.include.all.keys(
          "id",
          "name",
          "zip_code",
          "description",
          "species",
          "breed",
          "color",
          "age",
          "gender",
          "is_lost",
          "in_shelter"
        );
      });
  });
});
