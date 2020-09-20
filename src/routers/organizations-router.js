const express = require("express");
const OrganizationsService = require("../services/organizations-service");

const OrganizationsRouter = express.Router();
const jsonParser = express.json();

OrganizationsRouter.route("/")
  .get((req, res, next) => {
    OrganizationsService.getAllOrganizations(req.app.get("db"))
      .then((organizations) => {
        res.json(organizations);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {
      name,
      zip_code,
      description,
      type,
      address,
      website,
      phone_number,
    } = req.body;
    const newOrganization = {
      name,
      zip_code,
      description,
      type,
      address,
      website,
      phone_number,
    };
    OrganizationsService.insertOrganization(req.app.get("db"), newOrganization)
      .then((organization) => {
        res
          .status(201)
          .location(`organizations/${organization.id}`)
          .json(organization);
      })
      .catch(next);
  });

OrganizationsRouter.route("/:organization_id")
  .get((req, res, next) => {
    OrganizationsService.getById(req.app.get("db"), req.params.organization_id)
      .then((organization) => {
        res.json(organization);
      })
      .catch(next);
  })
  .put((req, res, next) => {
    OrganizationsService.updateOrganization(
      req.app.get("db"),
      req.params.organization_id,
      req.body
    )
      .then((organization) => {
        res
          .status(200)
          .location(`organizations/${organization.id}`)
          .json(organization);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    OrganizationsService.deleteOrganization(
      req.app.get("db"),
      req.params.organization_id
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

OrganizationsRouter.route("/zip/:zip_code").get((req, res, next) => {
  OrganizationsService.getByZip(req.app.get("db"), req.params.zip_code)
    .then((organization) => {
      res.json(organization);
    })
    .catch(next);
});

module.exports = OrganizationsRouter;
