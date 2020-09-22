const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");

describe("Organizations Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  it("GET /organizations responds with 200 and all of the organizations", () => {
    return supertest(app)
      .get("/organizations")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        expect(res.body[0]).to.include.all.keys(
          "name",
          "zip_code",
          "description",
          "type",
          "address",
          "website",
          "phone_number"
        );
      });
  });
});
