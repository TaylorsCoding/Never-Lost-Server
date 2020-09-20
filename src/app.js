require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const OrganizationsRouter = require("./routers/organizations-router");
const AnimalsRouter = require("./routers/animals-router");
const EventsRouter = require("./routers/events-router");
const TopicsRouter = require("./routers/topics-router");
const PostsRouter = require("./routers/posts-router");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

// These are all the express routers that this app has been designated to use
app.use("/organizations", OrganizationsRouter);
app.use("/animals", AnimalsRouter);
app.use("/events", EventsRouter);
app.use("/topics", TopicsRouter);
app.use("/posts", PostsRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
