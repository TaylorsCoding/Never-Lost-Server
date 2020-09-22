const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeAnimalsArray } = require("./fixtures/animals.fixtures");

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
describe(`GET /animals/:animal_id`, () => {
  context("Given there are animals in the database", () => {
    const testAnimals = makeAnimalsArray();

    let db;

    before("make knex instance", () => {
      db = knex({
        client: "pg",
        connection: process.env.TEST_DATABASE_URL,
      });
      app.set("db", db);
    });

    it("responds with 200 and the specified animal", () => {
      return supertest(app).get(`/animals/1`).expect(200, {
        id: 1,
        name: "g",
        zip_code: "22042",
        species: "human",
        breed: "god",
        color: "bleach",
        age: 33,
        gender: "Male",
        description: "first user",
        is_lost: true,
        in_shelter: null,
      });
    });
  });
});
