const express = require("express");
const TopicsService = require("../services/topics-service");

const TopicsRouter = express.Router();
const jsonParser = express.json();

TopicsRouter.route("/")
  .get((req, res, next) => {
    TopicsService.getAllTopics(req.app.get("db"))
      .then((topics) => {
        res.json(topics);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title, zip_code, event_id } = req.body;
    const newTopic = {
      title,
      zip_code,
      event_id,
    };
    TopicsService.insertTopic(req.app.get("db"), newTopic)
      .then((topic) => {
        res.status(201).location(`topics/${topic.id}`).json(topic);
      })
      .catch(next);
  });

TopicsRouter.route("/:topic_id")
  .get((req, res, next) => {
    TopicsService.getById(req.app.get("db"), req.params.topic_id)
      .then((topic) => {
        res.json(topic);
      })
      .catch(next);
  })
  .put((req, res, next) => {
    TopicsService.updateTopic(req.app.get("db"), req.params.topic_id, req.body)
      .then((topic) => {
        res.status(200).location(`topics/${topic.id}`).json(topic);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    TopicsService.deleteTopic(req.app.get("db"), req.params.topic_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

TopicsRouter.route("/zip/:zip_code").get((req, res, next) => {
  TopicsService.getByZip(req.app.get("db"), req.params.zip_code)
    .then((topic) => {
      res.json(topic);
    })
    .catch(next);
});

module.exports = TopicsRouter;
