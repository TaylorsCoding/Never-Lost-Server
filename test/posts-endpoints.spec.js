const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const { makeTopicsArray } = require("./fixtures/topics.fixtures.js");
const { makeEventsArray } = require("./fixtures/events.fixtures.js");
const {
  makeOrganizationsArray,
} = require("./fixtures/organizations.fixtures.js");
const { makeAnimalsArray } = require("./fixtures/animals.fixtures.js");
const { makePostsArray } = require("./fixtures/posts.fixtures.js");

describe.only("Organizations Endpoints", function () {
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

  describe("GET /posts", () => {
    context(`Given no posts`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app).get("/posts").expect(200, []);
      });
    });
    context("Given there are posts in the database", () => {
      const testOrganizations = makeOrganizationsArray();
      const testAnimals = makeAnimalsArray();
      const testEvents = makeEventsArray();
      const testTopics = makeTopicsArray();
      const testPosts = makePostsArray();

      beforeEach("insert posts", () => {
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
                    return db
                      .into("neverlostdb_topics")
                      .insert(testTopics)
                      .then(() => {
                        return db.into("neverlostdb_posts").insert(testPosts);
                      });
                  });
              });
          });
      });

      it("responds with 200 and all of the posts", () => {
        return supertest(app).get("/posts").expect(200, testPosts);
      });
    });
  });
  describe(`GET /posts/:post_id`, () => {
    context(`Given no posts`, () => {
      it(`responds with 404`, () => {
        const postId = 123456;
        return supertest(app)
          .get(`/posts/${postId}`)
          .expect(404, { error: { message: `Post doesn't exist` } });
      });
    });

    context("Given there are posts in the database", () => {
      const testOrganizations = makeOrganizationsArray();
      const testAnimals = makeAnimalsArray();
      const testEvents = makeEventsArray();
      const testTopics = makeTopicsArray();
      const testPosts = makePostsArray();

      beforeEach("insert posts", () => {
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
                    return db
                      .into("neverlostdb_topics")
                      .insert(testTopics)
                      .then(() => {
                        return db.into("neverlostdb_posts").insert(testPosts);
                      });
                  });
              });
          });
      });

      it("responds with 200 and the specified post", () => {
        const postId = 2;
        const expectedPost = testPosts[postId - 1];
        return supertest(app).get(`/posts/${postId}`).expect(200, expectedPost);
      });
    });
  });
  describe(`POST /posts`, () => {
    const testOrganizations = makeOrganizationsArray();
    const testAnimals = makeAnimalsArray();
    const testEvents = makeEventsArray();
    const testTopics = makeTopicsArray();

    beforeEach("insert posts", () => {
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

    it(`creates a post, responding with 201 and the new post`, () => {
      const newPost = {
        content: "This is a cool website.",
        topic_id: 1,
        event_id: null,
      };

      return supertest(app)
        .post("/posts")
        .send(newPost)
        .expect(201)
        .expect((res) => {
          expect(res.body.content).to.eql(newPost.content);
          expect(res.body.topic_id).to.eql(newPost.topic_id);
          expect(res.body.event_id).to.eql(newPost.event_id);
          expect(res.body).to.have.property("id");
          expect(res.headers.location).to.eql(`/posts/${res.body.id}`);
        })
        .then((res) =>
          supertest(app).get(`/posts/${res.body.id}`).expect(res.body)
        );
    });

    const requiredFields = ["content"];

    requiredFields.forEach((field) => {
      const newPost = {
        content: "Awesome website.",
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newPost[field];

        return supertest(app)
          .post("/posts")
          .send(newPost)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` },
          });
      });
    });
  });
});
