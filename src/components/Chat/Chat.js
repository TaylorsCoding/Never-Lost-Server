import React, { Component } from "react";
import "./Chat.css";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import Topic from "../Topic/Topic";
import { NavLink } from "react-router-dom";

/**
 * Documentation
 *
 * @param contextType references data in ApiContext
 *
 * @param globalTopics holds all topics
 * @param localTopics holds topics in set zip code or in zip code +- 500
 * @param globalEvents holds all events
 */

export default class Chat extends Component {
  static contextType = ApiContext;

  render() {
    // both local and global topics are pulled if they exist

    // globalEvents is referenced with a conditional operator if
    // the topic is associated with an event.

    const {
      globalTopics = [],
      localTopics = [],
      globalEvents = [],
    } = this.context;
    return (
      <div className="chat-content">
        <ErrorBoundary>
          <h1>Chat</h1>
          <div className="add-button">
            <NavLink to="/create-topic">
              <button>Create a New Topic!</button>
            </NavLink>
          </div>
          {localTopics.length > 0 ? (
            <>
              <h1>Local Topics</h1>
              {localTopics.map((topic) => (
                <Topic
                  id={topic.id}
                  key={topic.id}
                  title={topic.title}
                  zip_code={topic.zip_code}
                  event_id={
                    topic.event_id
                      ? globalEvents.find(
                          (event) =>
                            parseInt(event.id) === parseInt(topic.event_id)
                        )
                        ? globalEvents.find(
                            (event) =>
                              parseInt(event.id) === parseInt(topic.event_id)
                          ).title
                        : null
                      : null
                  }
                  date_published={topic.date_published}
                  date_last_post={topic.date_time_of_last_post}
                />
              ))}
            </>
          ) : null}
          <h1>All Topics</h1>
          {globalTopics.length > 0
            ? globalTopics.map((topic) => (
                <Topic
                  id={topic.id}
                  key={topic.id}
                  title={topic.title}
                  zip_code={topic.zip_code}
                  event_id={
                    topic.event_id
                      ? globalEvents.find(
                          (event) =>
                            parseInt(event.id) === parseInt(topic.event_id)
                        )
                        ? globalEvents.find(
                            (event) =>
                              parseInt(event.id) === parseInt(topic.event_id)
                          ).title
                        : null
                      : null
                  }
                  date_published={topic.date_published}
                  date_last_post={topic.date_time_of_last_post}
                />
              ))
            : null}
        </ErrorBoundary>
      </div>
    );
  }
}
