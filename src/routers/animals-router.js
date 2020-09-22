const express = require("express");
const AnimalsService = require("../services/animals-service");

//this file is made an Express Router with the following line
const AnimalsRouter = express.Router();
const jsonParser = express.json();

// Being a express router file that is set to handle all paths that
// begin with "/animals", we can now deal with all the possible paths
// in a much more simple way than if we didn't use router

//this route handles the path "/animals/", both the get and the post request types
AnimalsRouter.route("/")
  //here it deals with the get
  .get((req, res, next) => {
    AnimalsService.getAllAnimals(req.app.get("db"))
      .then((animals) => {
        res.json(animals);
      })
      .catch(next);
  })
  //and here it deals with the post. notice how they are chained
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
      breed,
      color,
      age,
      gender,
      description,
      zip_code,
      is_lost,
      in_shelter,
    };
    AnimalsService.insertAnimal(req.app.get("db"), newAnimal)
      .then((animal) => {
        res.status(201).location(`animals/${animal.id}`).json(animal);
      })
      .catch(next);
  });

//this router handles all routes "/animals/:animal_id"
AnimalsRouter.route("/:animal_id")
  // this get gets one animal based on its id
  .get((req, res, next) => {
    AnimalsService.getById(req.app.get("db"), req.params.animal_id)
      .then((animal) => {
        res.json(animal);
      })
      .catch(next);
  })
  // this put updates one animal
  .put((req, res, next) => {
    AnimalsService.updateAnimal(
      req.app.get("db"),
      req.params.animal_id,
      req.body
    )
      .then((animal) => {
        res.status(200).location(`animals/${animal.id}`).json(animal);
      })
      .catch(next);
  })
  // this delete deletes one animal
  .delete((req, res, next) => {
    AnimalsService.deleteAnimal(req.app.get("db"), req.params.animal_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

AnimalsRouter.route("/zip/:zip_code").get((req, res, next) => {
  AnimalsService.getByZip(req.app.get("db"), req.params.zip_code)
    .then((animal) => {
      res.json(animal);
    })
    .catch(next);
});

module.exports = AnimalsRouter;
