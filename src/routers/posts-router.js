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
    PostsService.insertPost(req.app.get("db"), newPost)
      .then((post) => {
        res.status(201).location(`posts/${post.id}`).json(post);
      })
      .catch(next);
  });

PostsRouter.route("/:post_id")
  .get((req, res, next) => {
    PostsService.getById(req.app.get("db"), req.params.post_id)
      .then((post) => {
        res.json(post);
      })
      .catch(next);
  })
  .put((req, res, next) => {
    PostsService.updatePost(req.app.get("db"), req.params.post_id, req.body)
      .then((post) => {
        res.status(200).location(`posts/${post.id}`).json(post);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    PostsService.deletePost(req.app.get("db"), req.params.post_id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = PostsRouter;
