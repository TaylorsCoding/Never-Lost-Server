const findMoreZips = require("../helpers/ExpandZipArea");

const EventsService = {
  getAllEvents(db) {
    return db("neverlostdb_events").select("*");
  },

  insertEvent(db, data) {
    return db("neverlostdb_events")
      .insert(data)
      .returning("*")
      .then((rows) => rows[0]);
  },

  getById(db, id) {
    return db("neverlostdb_events").select("*").where({ id }).first();
  },

  getByZip(db, zip) {
    console.log(findMoreZips(zip));
    return db("neverlostdb_events")
      .select("*")
      .where((event) => event.whereIn("zip_code", findMoreZips(zip)));
  },

  deleteEvent(db, id) {
    return db("neverlostdb_events").where({ id }).delete();
  },

  updateEvent(db, id, data) {
    return db("neverlostdb_events").where({ id }).update(data);
  },
};

module.exports = EventsService;
