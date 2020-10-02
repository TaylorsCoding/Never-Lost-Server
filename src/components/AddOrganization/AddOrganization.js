import React, { Component } from "react";
import "./AddOrganization.css";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import config from "../../config";

/**
 * Documentation
 *
 * State Variables
 *
 * @param servErr returns server error
 * @param nameVer whether name has been input
 * @param zcVer whether zip code has been input
 * @param descVer whether description has been input
 * @param typeVer whether type has been input
 *
 * @param defaultProps contains @param history to navigate after post has been made
 *
 * @function handleSubmit posts data to server to create a new organization
 *  @param errCount counts the validation errors
 */

export default class AddOrganization extends Component {
  state = {
    servErr: "",
    nameVer: true,
    zcVer: true,
    descVer: true,
    typeVer: true,
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

    if (e.target["name"].value.length === 0) {
      this.setState({ titleVer: false });
      errCount++;
    }
    if (e.target["zip_code"].value.length === 0) {
      this.setState({ zcVer: false });
      errCount++;
    }
    if (e.target["type"].value.length === 0) {
      this.setState({ typeVer: false });
      errCount++;
    }
    if (e.target["description"].value.length === 0) {
      this.setState({ descVer: false });
      errCount++;
    }

    if (errCount > 0) {
      return;
    }

    const org = {
      name: e.target["name"].value,
      zip_code: e.target["zip_code"].value,
      description: e.target["description"].value,
      type: e.target["type"].value,
      address: e.target["address"].value,
      website: e.target["website"].value,
      phone_number: e.target["phone_number"].value,
    };

    fetch(`${config.API_ENDPOINT}/organizations`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(org),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((e) => Promise.reject(e));
        }
        return response.json();
      })
      .then((org) => {
        this.context.addOrganization(org);
        this.props.history.push(`/organizations`);
      })
      .catch((error) => {
        this.setState({ servErr: error });
      });
  };

  render() {
    return (
      <div className="org-content">
        <ErrorBoundary>
          <h1>Add an Organization</h1>
          {this.state.servErr.length > 0 ? this.state.servErr : null}
          <form onSubmit={this.handleSubmit} action="#">
            <fieldset>
              <div>
                <label htmlFor="add-org-name">
                  Name{this.state.nameVer ? null : ": You must add a name."}
                </label>
              </div>
              <div>
                <input type="text" name="name" id="add-org-name" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-org-zipcode">
                  Zip Code
                  {this.state.zcVer ? null : ": You must add a zip code."}
                </label>
              </div>
              <div>
                <input type="text" name="zip_code" id="add-org-zipcode" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-org-desc">
                  Description
                  {this.state.descVer ? null : ": You must add a description."}
                </label>
              </div>
              <div>
                <textarea type="text" name="description" id="add-org-desc" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-org-type">
                  Type{this.state.typeVer ? null : ": You must add a type."}
                </label>
              </div>
              <div>
                <input type="text" name="type" id="add-org-type" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-org-add">Address - Enter if Known</label>
              </div>
              <div>
                <input type="text" name="address" id="add-org-add" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-org-web">Website - Enter if Known</label>
              </div>
              <div>
                <input type="text" name="website" id="add-org-web" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-org-phone">
                  Phone Number - Enter if Known
                </label>
              </div>
              <div>
                <input type="tel" name="phone_number" id="add-org-phone" />
              </div>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        </ErrorBoundary>
      </div>
    );
  }
}
