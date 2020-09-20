const findMoreZips = require("../helpers/ExpandZipArea");

const AnimalsService = {
  getAllAnimals(db) {
    return db("neverlostdb_animals").select("*");
  },

  insertAnimal(db, data) {
    return db("neverlostdb_animals")
      .insert(data)
      .returning("*")
      .then((rows) => rows[0]);
  },

  getById(db, id) {
    return db("neverlostdb_animals").select("*").where({ id }).first();
  },

  getByZip(db, zip) {
    return db("neverlostdb_animals")
      .select("*")
      .where((animal) => animal.whereIn("zip_code", findMoreZips(zip)));
  },

  deleteAnimal(db, id) {
    return db("neverlostdb_animals").where({ id }).delete();
  },

  updateAnimal(db, id, data) {
    return db("neverlostdb_animals").where({ id }).update(data);
  },
};

module.exports = AnimalsService;
