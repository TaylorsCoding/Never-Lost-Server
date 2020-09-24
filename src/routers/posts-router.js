const express = require("express");
const PostsService = require("../services/posts-service");

const PostsRouter = express.Router();
const jsonParser = express.json();

PostsRouter.route("/")
  .get((req, res, next) => {
    PostsService.getAllPosts(req.app.get("db"))
      .then((posts) => {
        res.json(posts);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { content, topic_id, event_id } = req.body;
    const newPost = {
      content,
      topic_id,
      event_id,
    };
    if (newPost.content == null) {
      return res.status(400).json({
        error: { message: `Missing 'content' in request body` },
      });
    }
    if (newPost.topic_id == null && newPost.event_id == null) {
      return res.status(400).json({
        error: { message: `Missing 'topic_id' or 'event_id' in request body` },
      });
    }
    PostsService.insertPost(req.app.get("db"), newPost)
      .then((post) => {
        res.status(201).location(`/posts/${post.id}`).json(post);
      })
      .catch(next);
  });

PostsRouter.route("/:post_id").get((req, res, next) => {
  PostsService.getById(req.app.get("db"), req.params.post_id)
    .then((post) => {
      if (!post) {
        res.status(404).send({ error: { message: "Post doesn't exist" } });
      }
      res.json(post);
    })
    .catch(next);
});

module.exports = PostsRouter;
