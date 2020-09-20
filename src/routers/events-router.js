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
      animal_id,
      org_id,
    };
    EventsService.insertEvent(req.app.get("db"), newEvent)
      .then((event) => {
        res.status(201).redirect(`events/${event.id}`);
      })
      .catch(next);
  });

EventsRouter.route("/:event_id")
  .get((req, res, next) => {
    EventsService.getById(req.app.get("db"), req.params.event_id)
      .then((event) => {
        res.json(event);
      })
      .catch(next);
  })
  .put((req, res, next) => {
    EventsService.updateEvent(req.app.get("db"), req.params.event_id, req.body)
      .then((event) => {
        res.status(200).location(`events/${event.id}`).json(event);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    EventsService.deleteEvent(req.app.get("db"), req.params.event_id)
      .then(() => {
        res.status(204).end();
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
