const findMoreZips = require("../helpers/ExpandZipArea");

const OrganizationsService = {
  getAllOrganizations(db) {
    return db("neverlostdb_organizations").select("*");
  },

  insertOrganization(db, data) {
    return db("neverlostdb_organizations")
      .insert(data)
      .returning("*")
      .then((rows) => rows[0]);
  },

  getById(db, id) {
    return db("neverlostdb_organizations").select("*").where({ id }).first();
  },

  getByZip(db, zip) {
    console.log(findMoreZips(zip));
    return db("neverlostdb_organizations")
      .select("*")
      .where((org) => org.whereIn("zip_code", findMoreZips(zip)));
  },

  deleteOrganization(db, id) {
    return db("neverlostdb_organizations").where({ id }).delete();
  },

  updateOrganization(db, id, data) {
    return db("neverlostdb_organizations").where({ id }).update(data);
  },
};

module.exports = OrganizationsService;
