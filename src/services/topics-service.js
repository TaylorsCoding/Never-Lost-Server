const findMoreZips = require("../helpers/ExpandZipArea");

const TopicsService = {
  getAllTopics(db) {
    return db("neverlostdb_topics").select("*");
  },

  insertTopic(db, data) {
    return db("neverlostdb_topics")
      .insert(data)
      .returning("*")
      .then((rows) => rows[0]);
  },

  getById(db, id) {
    return db("neverlostdb_topics").select("*").where({ id }).first();
  },

  getByZip(db, zip) {
    console.log(findMoreZips(zip));
    return db("neverlostdb_topics")
      .select("*")
      .where((topic) => topic.whereIn("zip_code", findMoreZips(zip)));
  },

  deleteTopic(db, id) {
    return db("neverlostdb_topics").where({ id }).delete();
  },

  updateTopic(db, id, data) {
    return db("neverlostdb_topics").where({ id }).update(data);
  },
};

module.exports = TopicsService;
