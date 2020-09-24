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
    };
    for (const [key, value] of Object.entries(newTopic))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    finalTopic = { ...newTopic, event_id };
    TopicsService.insertTopic(req.app.get("db"), finalTopic)
      .then((topic) => {
        res.status(201).location(`/topics/${topic.id}`).json(topic);
      })
      .catch(next);
  });

TopicsRouter.route("/:topic_id").get((req, res, next) => {
  TopicsService.getById(req.app.get("db"), req.params.topic_id)
    .then((topic) => {
      if (!topic) {
        res.status(404).send({ error: { message: "Topic doesn't exist" } });
      }
      res.json(topic);
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
