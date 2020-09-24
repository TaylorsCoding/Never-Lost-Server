const express = require("express");
const EventsService = require("../services/events-service");

const EventsRouter = express.Router();
const jsonParser = express.json();

EventsRouter.route("/")
  .get((req, res, next) => {
    EventsService.getAllEvents(req.app.get("db"))
      .then((events) => {
        res.json(events);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title, zip_code, type, description, animal_id, org_id } = req.body;
    const newEvent = {
      title,
      zip_code,
      type,
      description,
    };
    for (const [key, value] of Object.entries(newEvent))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
    finalEvent = {
      ...newEvent,
      animal_id,
      org_id,
    };
    EventsService.insertEvent(req.app.get("db"), finalEvent)
      .then((event) => {
        console.log(event);
        res.status(201).location(`/events/${event.id}`).json(event);
      })
      .catch(next);
  });

EventsRouter.route("/:event_id").get((req, res, next) => {
  EventsService.getById(req.app.get("db"), req.params.event_id)
    .then((event) => {
      if (!event) {
        res.status(404).send({ error: { message: "Event doesn't exist" } });
      }
      res.json(event);
    })
    .catch(next);
});

EventsRouter.route("/zip/:zip_code").get((req, res, next) => {
  EventsService.getByZip(req.app.get("db"), req.params.zip_code)
    .then((event) => {
      res.json(event);
    })
    .catch(next);
});

module.exports = EventsRouter;
