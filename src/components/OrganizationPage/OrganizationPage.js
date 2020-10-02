import React, { Component } from "react";
import "./OrganizationPage.css";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";

export default class OrganizationPage extends Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;
  render() {
    const { globalOrganizations = [] } = this.context;
    const { org_id } = this.props.match.params;
    const org = globalOrganizations.find((org) => org.id === parseInt(org_id));
    return (
      <ErrorBoundary>
        <div className="org-content">
          <h1>{org ? org.name : null}</h1>
          <h3>Description</h3>
          <p>
            <span className="light-text">{org ? org.description : null}</span>
          </p>
          <p>
            Type: <span className="light-text">{org ? org.type : null}</span>
          </p>
          <p>
            Address:{" "}
            <span className="light-text">{org ? org.address : null}</span>
          </p>
          <p>
            Website:{" "}
            <span className="light-text">{org ? org.website : null}</span>
          </p>
          <p>
            Phone Number:{" "}
            <span className="light-text">{org ? org.phone_number : null}</span>
          </p>
          <p>
            Zip-Code:{" "}
            <span className="light-text">{org ? org.zip_code : null}</span>
          </p>
        </div>
      </ErrorBoundary>
    );
  }
}
