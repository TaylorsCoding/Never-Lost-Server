const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeAnimalsArray } = require("./fixtures/animals.fixtures.js");
const {
  makeOrganizationsArray,
} = require("./fixtures/organizations.fixtures.js");

describe.only("Animals Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db.raw(
      "TRUNCATE neverlostdb_organizations, neverlostdb_animals, neverlostdb_events, neverlostdb_topics, neverlostdb_posts RESTART IDENTITY CASCADE"
    )
  );

  afterEach("cleanup", () =>
    db.raw(
      "TRUNCATE neverlostdb_organizations, neverlostdb_animals, neverlostdb_events, neverlostdb_topics, neverlostdb_posts RESTART IDENTITY CASCADE"
    )
  );

  describe("Get /animals", () => {
    context(`Given no aninals`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/animals").expect(200, []);
      });
    });
    context("Given there are animals in the database", () => {
      const testOrganizations = makeOrganizationsArray();
      const testAnimals = makeAnimalsArray();

      beforeEach("insert animals", () => {
        return db
          .into("neverlostdb_organizations")
          .insert(testOrganizations)
          .then(() => {
            return db.into("neverlostdb_animals").insert(testAnimals);
          });
      });

      it("responds with 200 and all of the animals", () => {
        return supertest(app).get("/animals").expect(200, testAnimals);
      });
    });
  });

  describe(`GET /animals/:animal_id`, () => {
    context(`Given no animals`, () => {
      it(`responds with 404`, () => {
        const animalId = 123456;
        return supertest(app)
          .get(`/animals/${animalId}`)
          .expect(404, { error: { message: `animal doesn't exist` } });
      });
    });
    context("Given there are animals in the database", () => {
      const testOrganizations = makeOrganizationsArray();
      const testAnimals = makeAnimalsArray();

      beforeEach("insert animals", () => {
        return db
          .into("neverlostdb_organizations")
          .insert(testOrganizations)
          .then(() => {
            return db.into("neverlostdb_animals").insert(testAnimals);
          });
      });

      it("responds with 200 and the specified animal", () => {
        const animalId = 2;
        const expectedAnimal = testAnimals[animalId - 1];
        return supertest(app)
          .get(`/animals/${animalId}`)
          .expect(200, expectedAnimal);
      });
    });
  });

  describe(`POST /animals`, () => {
    const testOrganizations = makeOrganizationsArray();

    beforeEach("insert animal", () => {
      return db.into("neverlostdb_organizations").insert(testOrganizations);
    });

    it(`creates an Animal, responding with 201 and the new Animal`, () => {
      const newAnimal = {
        name: "Bambi",
        species: "deer",
        breed: "doe",
        color: "brown",
        age: 35,
        gender: "female",
        description: "Disney animal",
        zip_code: "31281",
        is_lost: false,
        in_shelter: 8,
      };

      return supertest(app)
        .post("/animals")
        .send(newAnimal)
        .expect(201)
        .expect((res) => {
          expect(res.body.name).to.eql(newAnimal.name);
          expect(res.body.species).to.eql(newAnimal.species);
          expect(res.body.breed).to.eql(newAnimal.breed);
          expect(res.body.color).to.eql(newAnimal.color);
          expect(res.body.age).to.eql(newAnimal.age);
          expect(res.body.gender).to.eql(newAnimal.gender);
          expect(res.body.description).to.eql(newAnimal.description);
          expect(res.body.zip_code).to.eql(newAnimal.zip_code);
          expect(res.body.is_lost).to.eql(newAnimal.is_lost);
          expect(res.body.in_shelter).to.eql(newAnimal.in_shelter);
          expect(res.body).to.have.property("id");
          expect(res.headers.location).to.eql(`/animals/${res.body.id}`);
        })
        .then((res) =>
          supertest(app).get(`/animals/${res.body.id}`).expect(res.body)
        );
    });

    const requiredFields = ["name", "zip_code", "species", "is_lost"];

    requiredFields.forEach((field) => {
      const newAnimal = {
        name: "Bambi",
        species: "Deer",
        zip_code: "38193",
        is_lost: false,
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newAnimal[field];

        return supertest(app)
          .post("/animals")
          .send(newAnimal)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` },
          });
      });
    });
  });

  describe("GET /animals/zip/:zip_code", () => {
    context("Given there are animals in the database", () => {
      const testOrganizations = makeOrganizationsArray();
      const testAnimals = makeAnimalsArray();

      beforeEach("insert animals", () => {
        return db
          .into("neverlostdb_organizations")
          .insert(testOrganizations)
          .then(() => {
            return db.into("neverlostdb_animals").insert(testAnimals);
          });
      });

      it("responds with 200 and returns all animals within a certain range of zip codes", () => {
        return supertest(app)
          .get("/animals/zip/50000")
          .expect(200)
          .expect("Content-Type", /json/)
          .then((res) => {
            expect(res.body).to.be.an("array");
            for (element of res.body) {
              expect(parseInt(element.zip_code)).to.be.greaterThan(49499);
              expect(parseInt(element.zip_code)).to.be.lessThan(50501);
            }
          });
      });
    });
  });
});
