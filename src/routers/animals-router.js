const express = require("express");
const AnimalsService = require("../services/animals-service");

const AnimalsRouter = express.Router();
const jsonParser = express.json();

AnimalsRouter.route("/")
  .get((req, res, next) => {
    AnimalsService.getAllAnimals(req.app.get("db"))
      .then((animals) => {
        res.json(animals);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {
      name,
      species,
      breed,
      color,
      age,
      gender,
      description,
      zip_code,
      is_lost,
      in_shelter,
    } = req.body;
    const newAnimal = {
      name,
      species,
      zip_code,
      is_lost,
    };
    for (const [key, value] of Object.entries(newAnimal))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
    finalAnimal = {
      ...newAnimal,
      breed,
      age,
      description,
      in_shelter,
      color,
      gender,
    };

    AnimalsService.insertAnimal(req.app.get("db"), finalAnimal)
      .then((animal) => {
        res.status(201).location(`/animals/${animal.id}`).json(animal);
      })
      .catch(next);
  });

AnimalsRouter.route("/:animal_id").get((req, res, next) => {
  AnimalsService.getById(req.app.get("db"), req.params.animal_id)
    .then((animal) => {
      if (!animal) {
        res.status(404).send({ error: { message: "animal doesn't exist" } });
      }
      res.json(animal);
    })
    .catch(next);
});
// .put((req, res, next) => {
//   AnimalsService.updateAnimal(
//     req.app.get("db"),
//     req.params.animal_id,
//     req.body
//   )
//     .then((animal) => {
//       res.status(200).location(`animals/${animal.id}`).json(animal);
//     })
//     .catch(next);
// })
// .delete((req, res, next) => {
//   AnimalsService.deleteAnimal(req.app.get("db"), req.params.animal_id)
//     .then(() => {
//       res.status(204).end();
//     })
//     .catch(next);
// });

AnimalsRouter.route("/zip/:zip_code").get((req, res, next) => {
  AnimalsService.getByZip(req.app.get("db"), req.params.zip_code)
    .then((animal) => {
      res.json(animal);
    })
    .catch(next);
});

module.exports = AnimalsRouter;
