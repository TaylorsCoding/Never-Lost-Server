const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const {
  makeOrganizationsArray,
} = require("./fixtures/organizations.fixtures.js");

describe.only(`Organizations Endpoints`, function () {
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

  describe(`GET /organizations`, () => {
    context(`Given no organizations`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/organizations").expect(200, []);
      });
    });
    context("Given there are organizations in the database", () => {
      const testOrganizations = makeOrganizationsArray();

      beforeEach("insert organizations", () => {
        return db.into("neverlostdb_organizations").insert(testOrganizations);
      });

      it("responds with 200 and all of the organizations", () => {
        return supertest(app)
          .get("/organizations")
          .expect(200, testOrganizations);
      });
    });
  });

  describe(`GET /organizations/:org_id`, () => {
    context(`Given no organizations`, () => {
      it(`responds with 404`, () => {
        const organizationId = 123456;
        return supertest(app)
          .get(`/organizations/${organizationId}`)
          .expect(404, { error: { message: `Organization doesn't exist` } });
      });
    });

    context("Given there are organizations in the database", () => {
      const testOrganizations = makeOrganizationsArray();

      beforeEach("insert organizations", () => {
        return db.into("neverlostdb_organizations").insert(testOrganizations);
      });

      it("responds with 200 and the specified organization", () => {
        const organizationId = 2;
        const expectedOrganization = testOrganizations[organizationId - 1];
        return supertest(app)
          .get(`/organizations/${organizationId}`)
          .expect(200, expectedOrganization);
      });
    });
  });

  describe(`POST /organizations`, () => {
    it(`creates an organization, responding with 201 and the new organization`, () => {
      const newOrganization = {
        name: "ListiclePet",
        zip_code: "38193",
        description: "Test new organization content...",
        type: "Veterinarian",
        address: "1492 Prosperity St, Oklahoma City",
        website: "www.listiclepet.com",
        phone_number: "(703) 372-2917",
      };

      return supertest(app)
        .post("/organizations")
        .send(newOrganization)
        .expect(201)
        .expect((res) => {
          expect(res.body.name).to.eql(newOrganization.name);
          expect(res.body.zip_code).to.eql(newOrganization.zip_code);
          expect(res.body.description).to.eql(newOrganization.description);
          expect(res.body.type).to.eql(newOrganization.type);
          expect(res.body.address).to.eql(newOrganization.address);
          expect(res.body.website).to.eql(newOrganization.website);
          expect(res.body.phone_number).to.eql(newOrganization.phone_number);
          expect(res.body).to.have.property("id");
          expect(res.headers.location).to.eql(`/organizations/${res.body.id}`);
        })
        .then((res) =>
          supertest(app).get(`/organizations/${res.body.id}`).expect(res.body)
        );
    });

    const requiredFields = ["name", "zip_code", "description", "type"];

    requiredFields.forEach((field) => {
      const newOrganization = {
        name: "ListiclePet",
        zip_code: "38193",
        description: "Test new organization content...",
        type: "Veterinarian",
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newOrganization[field];

        return supertest(app)
          .post("/organizations")
          .send(newOrganization)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` },
          });
      });
    });
  });

  describe("GET /organizations/zip/:zip_code", () => {
    context("Given there are organizations in the database", () => {
      const testOrganizations = makeOrganizationsArray();

      beforeEach("insert organizations", () => {
        return db.into("neverlostdb_organizations").insert(testOrganizations);
      });

      it("responds with 200 and returns all organizations within a certain range of zip codes", () => {
        return supertest(app)
          .get("/organizations/zip/50000")
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
