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
    };

    for (const [key, value] of Object.entries(newOrganization))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    finalOrganization = { ...newOrganization, address, website, phone_number };

    OrganizationsService.insertOrganization(
      req.app.get("db"),
      finalOrganization
    )
      .then((organization) => {
        res
          .status(201)
          .location(`/organizations/${organization.id}`)
          .json(organization);
      })
      .catch(next);
  });

OrganizationsRouter.route("/:organization_id").get((req, res, next) => {
  OrganizationsService.getById(req.app.get("db"), req.params.organization_id)
    .then((organization) => {
      if (!organization) {
        res
          .status(404)
          .send({ error: { message: "Organization doesn't exist" } });
      }
      res.json(organization);
    })
    .catch(next);
});
// .put((req, res, next) => {
//   OrganizationsService.updateOrganization(
//     req.app.get("db"),
//     req.params.organization_id,
//     req.body
//   )
//     .then((organization) => {
//       res
//         .status(200)
//         .location(`organizations/${organization.id}`)
//         .json(organization);
//     })
//     .catch(next);
// })
// .delete((req, res, next) => {
//   OrganizationsService.deleteOrganization(
//     req.app.get("db"),
//     req.params.organization_id
//   )
//     .then(() => {
//       res.status(204).end();
//     })
//     .catch(next);
// });

OrganizationsRouter.route("/zip/:zip_code").get((req, res, next) => {
  OrganizationsService.getByZip(req.app.get("db"), req.params.zip_code)
    .then((organization) => {
      res.json(organization);
    })
    .catch(next);
});

module.exports = OrganizationsRouter;
