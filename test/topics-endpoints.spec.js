const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeTopicsArray } = require("./fixtures/topics.fixtures.js");
const { makeEventsArray } = require("./fixtures/events.fixtures.js");
const {
  makeOrganizationsArray,
} = require("./fixtures/organizations.fixtures.js");
const { makeAnimalsArray } = require("./fixtures/animals.fixtures.js");

describe.only("Topics Endpoints", function () {
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

  describe("GET /topics", () => {
    context(`Given no topics`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/topics").expect(200, []);
      });
    });
    context("Given there are topics in the database", () => {
      const testOrganizations = makeOrganizationsArray();
      const testAnimals = makeAnimalsArray();
      const testEvents = makeEventsArray();
      const testTopics = makeTopicsArray();

      beforeEach("insert topics", () => {
        return db
          .into("neverlostdb_organizations")
          .insert(testOrganizations)
          .then(() => {
            return db
              .into("neverlostdb_animals")
              .insert(testAnimals)
              .then(() => {
                return db
                  .into("neverlostdb_events")
                  .insert(testEvents)
                  .then(() => {
                    return db.into("neverlostdb_topics").insert(testTopics);
                  });
              });
          });
      });

      it("responds with 200 and all of the topics", () => {
        return supertest(app).get("/topics").expect(200, testTopics);
      });
    });
  });

  describe(`GET /topics/:topic_id`, () => {
    context(`Given no topics`, () => {
      it(`responds with 404`, () => {
        const topicId = 123456;
        return supertest(app)
          .get(`/topics/${topicId}`)
          .expect(404, { error: { message: `Topic doesn't exist` } });
      });
    });

    context("Given there are topics in the database", () => {
      const testOrganizations = makeOrganizationsArray();
      const testAnimals = makeAnimalsArray();
      const testEvents = makeEventsArray();
      const testTopics = makeTopicsArray();

      beforeEach("insert topics", () => {
        return db
          .into("neverlostdb_organizations")
          .insert(testOrganizations)
          .then(() => {
            return db
              .into("neverlostdb_animals")
              .insert(testAnimals)
              .then(() => {
                return db
                  .into("neverlostdb_events")
                  .insert(testEvents)
                  .then(() => {
                    return db.into("neverlostdb_topics").insert(testTopics);
                  });
              });
          });
      });

      it("responds with 200 and the specified topic", () => {
        const topicId = 2;
        const expectedTopic = testTopics[topicId - 1];
        return supertest(app)
          .get(`/topics/${topicId}`)
          .expect(200, expectedTopic);
      });
    });
  });

  describe(`POST /topics`, () => {
    const testOrganizations = makeOrganizationsArray();
    const testAnimals = makeAnimalsArray();
    const testEvents = makeEventsArray();

    beforeEach("insert topics", () => {
      return db
        .into("neverlostdb_organizations")
        .insert(testOrganizations)
        .then(() => {
          return db
            .into("neverlostdb_animals")
            .insert(testAnimals)
            .then(() => {
              return db.into("neverlostdb_events").insert(testEvents);
            });
        });
    });

    it(`creates a topic, responding with 201 and the new topic`, () => {
      const newTopic = {
        title: "Pet Clothes",
        zip_code: "38193",
        event_id: 5,
      };

      return supertest(app)
        .post("/topics")
        .send(newTopic)
        .expect(201)
        .expect((res) => {
          expect(res.body.title).to.eql(newTopic.title);
          expect(res.body.zip_code).to.eql(newTopic.zip_code);
          expect(res.body.event_id).to.eql(newTopic.event_id);
          expect(res.body).to.have.property("id");
          expect(res.headers.location).to.eql(`/topics/${res.body.id}`);
        })
        .then((res) =>
          supertest(app).get(`/topics/${res.body.id}`).expect(res.body)
        );
    });

    const requiredFields = ["title", "zip_code"];

    requiredFields.forEach((field) => {
      const newTopic = {
        title: "Pet Clothes",
        zip_code: "38193",
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newTopic[field];

        return supertest(app)
          .post("/topics")
          .send(newTopic)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` },
          });
      });
    });
  });

  describe("GET /topics/zip/:zip_code", () => {
    context("Given there are topics in the database", () => {
      const testOrganizations = makeOrganizationsArray();
      const testAnimals = makeAnimalsArray();
      const testEvents = makeEventsArray();
      const testTopics = makeTopicsArray();

      beforeEach("insert topics", () => {
        return db
          .into("neverlostdb_organizations")
          .insert(testOrganizations)
          .then(() => {
            return db
              .into("neverlostdb_animals")
              .insert(testAnimals)
              .then(() => {
                return db
                  .into("neverlostdb_events")
                  .insert(testEvents)
                  .then(() => {
                    return db.into("neverlostdb_topics").insert(testTopics);
                  });
              });
          });
      });

      it("responds with 200 and returns all topics within a certain range of zip codes", () => {
        return supertest(app)
          .get("/topics/zip/50000")
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
