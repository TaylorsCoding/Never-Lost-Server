const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeEventsArray } = require("./fixtures/events.fixtures.js");
const {
  makeOrganizationsArray,
} = require("./fixtures/organizations.fixtures.js");
const { makeAnimalsArray } = require("./fixtures/animals.fixtures.js");
describe.only("Events Endpoints", function () {
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

  describe("GET /events", () => {
    context(`Given no events`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/events").expect(200, []);
      });
    });
    context("Given there are events in the database", () => {
      const testOrganizations = makeOrganizationsArray();
      const testAnimals = makeAnimalsArray();
      const testEvents = makeEventsArray();

      beforeEach("insert events", () => {
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

      it("responds with 200 and all of the events", () => {
        return supertest(app).get("/events").expect(200, testEvents);
      });
    });
  });

  describe(`GET /events/:event_id`, () => {
    context(`Given no events`, () => {
      it(`responds with 404`, () => {
        const eventId = 123456;
        return supertest(app)
          .get(`/events/${eventId}`)
          .expect(404, { error: { message: `Event doesn't exist` } });
      });
    });
    context("Given there are events in the database", () => {
      const testOrganizations = makeOrganizationsArray();
      const testAnimals = makeAnimalsArray();
      const testEvents = makeEventsArray();

      beforeEach("insert events", () => {
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

      it("responds with 200 and the specified event", () => {
        const eventId = 2;
        const expectedEvent = testEvents[eventId - 1];
        return supertest(app)
          .get(`/events/${eventId}`)
          .expect(200, expectedEvent);
      });
    });
  });

  describe(`POST /events`, () => {
    const testOrganizations = makeOrganizationsArray();
    const testAnimals = makeAnimalsArray();

    beforeEach("insert Event", () => {
      return db
        .into("neverlostdb_organizations")
        .insert(testOrganizations)
        .then(() => {
          return db.into("neverlostdb_animals").insert(testAnimals);
        });
    });

    it(`creates an Event, responding with 201 and the new Event`, () => {
      const newEvent = {
        title: "Glamour",
        zip_code: "83051",
        type: "Pet Show",
        description: "Dress up your pets! Stout is the current winner!",
        animal_id: 3,
        org_id: 114,
      };

      return supertest(app)
        .post("/events")
        .send(newEvent)
        .expect(201)
        .expect((res) => {
          expect(res.body.title).to.eql(newEvent.title);
          expect(res.body.zip_code).to.eql(newEvent.zip_code);
          expect(res.body.type).to.eql(newEvent.type);
          expect(res.body.description).to.eql(newEvent.description);
          expect(res.body.animal_id).to.eql(newEvent.animal_id);
          expect(res.body.org_id).to.eql(newEvent.org_id);
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("date_time_of_last_post");
          expect(res.body).to.have.property("date_published");
          expect(res.headers.location).to.eql(`/events/${res.body.id}`);
          const expected = new Intl.DateTimeFormat("en-US").format(new Date());
          const actual = new Intl.DateTimeFormat("en-US").format(
            new Date(res.body.date_published)
          );
          expect(actual).to.eql(expected);
        })
        .then((res) =>
          supertest(app).get(`/events/${res.body.id}`).expect(res.body)
        );
    });

    const requiredFields = ["title", "zip_code", "description", "type"];

    requiredFields.forEach((field) => {
      const newEvent = {
        title: "Glamour",
        zip_code: "42981",
        description: "Cool show.",
        type: "Pet Show",
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newEvent[field];

        return supertest(app)
          .post("/events")
          .send(newEvent)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` },
          });
      });
    });
  });

  describe("GET /events/zip/:zip_code", () => {
    context("Given there are events in the database", () => {
      const testOrganizations = makeOrganizationsArray();
      const testAnimals = makeAnimalsArray();
      const testEvents = makeEventsArray();

      beforeEach("insert events", () => {
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

      it("responds with 200 and returns all events within a certain range of zip codes", () => {
        return supertest(app)
          .get("/events/zip/50000")
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
