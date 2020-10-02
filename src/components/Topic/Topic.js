import React, { Component } from "react";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { NavLink } from "react-router-dom";

import ApiContext from "../../APIcontext";

export default class Topic extends Component {
  static contextType = ApiContext;
  render() {
    const { globalEvents = [] } = this.context;
    const event = globalEvents.find(
      (event) => event.id === parseInt(this.props.event_id)
    );
    return (
      <ErrorBoundary>
        <NavLink to={`/topic/${this.props.id}`}>
          <h3>{this.props.title}</h3>
        </NavLink>
        <p>Zip Code: {this.props.zip_code}</p>
        <p>{event ? `Part of the ${event.title} event.` : null}</p>
      </ErrorBoundary>
    );
  }
}
