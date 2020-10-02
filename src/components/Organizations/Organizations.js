import React, { Component } from "react";
import "./Organizations.css";

import Organization from "../Organization/Organization";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import ApiContext from "../../APIcontext";
import { NavLink } from "react-router-dom";

export default class Organizations extends Component {
  static contextType = ApiContext;

  render() {
    // Both global and local organizations are pulled if they exist
    // local organizations display first, global organizations always display
    const { globalOrganizations = [], localOrganizations = [] } = this.context;
    return (
      <div className="org-content">
        <ErrorBoundary>
          <h1>Organizations</h1>
          <div className="add-button">
            <NavLink to="/create-organization">
              <button>Create an Organization</button>
            </NavLink>
          </div>
          {localOrganizations.length > 0 ? (
            <>
              <h1>Local Organizations</h1>
              {localOrganizations.map((org) => (
                <Organization
                  id={org.id}
                  key={org.id}
                  name={org.name}
                  zip_code={org.zip_code}
                  description={org.description}
                  type={org.type}
                  address={org.address}
                  website={org.website}
                  phone_number={org.phone_number}
                />
              ))}
            </>
          ) : null}
          <h1>All Organizations</h1>
          {globalOrganizations.map((org) => (
            <Organization
              id={org.id}
              key={org.id}
              name={org.name}
              zip_code={org.zip_code}
              description={org.description}
              type={org.type}
              address={org.address}
              website={org.website}
              phone_number={org.phone_number}
            />
          ))}
        </ErrorBoundary>
      </div>
    );
  }
}
