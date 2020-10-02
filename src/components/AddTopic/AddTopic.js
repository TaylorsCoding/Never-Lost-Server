import React, { Component } from "react";
import "./AddTopic.css";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import config from "../../config";

/**
 * Documentation
 *
 * State Variables
 *
 * @param servErr returns error from server if exists
 * @param titleVer whether title has been added
 * @param zcVer whether zip code has been added
 *
 * @param defaultProps contains @param history to navigate after post has been made
 *
 * @function handleSubmit posts data to server to create new topic
 *  @param errCount counts number of validation errors
 */

export default class AddTopic extends Component {
  state = {
    servErr: "",
    titleVer: true,
    zcVer: true,
  };
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();

    let errCount = 0;

    if (e.target["title"].value.length === 0) {
      this.setState({ typeVer: false });
      errCount++;
    }
    if (e.target["zip_code"].value.length === 0) {
      this.setState({ descVer: false });
      errCount++;
    }

    if (e.target["event_id"].value === "...") {
      e.target["event_id"].value = 0;
    }

    if (errCount > 0) {
      return;
    }

    const topic = {
      title: e.target["title"].value,
      zip_code: e.target["zip_code"].value,
      event_id: parseInt(e.target["event_id"].value),
    };

    fetch(`${config.API_ENDPOINT}/topics`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(topic),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((e) => Promise.reject(e));
        }
        return response.json();
      })
      .then((topic) => {
        this.context.addTopic(topic);
        this.props.history.push(`/chat`);
      })
      .catch((error) => {
        this.setState({ servErr: error });
      });
  };

  /**
   * @param globalEvents holds all events to select if topic is associated with event
   */

  render() {
    const { globalEvents = [] } = this.context;
    return (
      <div className="chat-content">
        <ErrorBoundary>
          <h1>Add a Topic</h1>
          {this.state.servErr.length > 0 ? this.state.servErr : null}
          <form onSubmit={this.handleSubmit} action="#">
            <fieldset>
              <div>
                <label htmlFor="add-topic-title">Title</label>
              </div>
              <div>
                <input type="text" name="title" id="add-topic-title" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-topic-zipcode">Zip Code</label>
              </div>
              <div>
                <input type="text" name="zip_code" id="add-topic-zipcode" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-topic-event">
                  Is this topic about an event?
                </label>
              </div>
              <div>
                <select name="event_id" id="add-topic-event">
                  <option>...</option>
                  {globalEvents.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title} - {event.zip_code}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        </ErrorBoundary>
      </div>
    );
  }
}
