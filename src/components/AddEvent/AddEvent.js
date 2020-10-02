import React, { Component } from "react";
import "./AddEvent.css";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import config from "../../config";
/**
 * Documentation
 *
 * State variables
 *
 * @param servErr holds error returned from server
 * @param titleVer whether title is entered
 * @param zcVer whether zipcode is entered
 * @param typeVer whether type is entered
 * @param descVer whether description is entered
 * @param aidVer whether animal id is entered
 * @param oidVer whether org id is entered
 *
 * @param defaultProps Contains @param history in order to allow for navigation after the post.
 *
 * @function handleSubmit posts the data to create a new event
 *  @param errCount counts the validation errors
 *
 */

export default class AddEvent extends Component {
  state = {
    servErr: "",
    titleVer: true,
    zcVer: true,
    typeVer: true,
    descVer: true,
    aidVer: true,
    oidVer: true,
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

    if (e.target["associatedAnimal"].value === "...")
      e.target["associatedAnimal"].value = 0;
    if (e.target["associatedOrganization"].value === "...")
      e.target["associatedOrganization"].value = 0;

    const event = {
      title: e.target["title"].value,
      zip_code: e.target["zip_code"].value,
      type: e.target["type"].value,
      description: e.target["description"].value,
      animal_id: parseInt(e.target["associatedAnimal"].value),
      org_id: parseInt(e.target["associatedOrganization"].value),
    };

    fetch(`${config.API_ENDPOINT}/events`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((e) => Promise.reject(e));
        }
        return response.json();
      })
      .then((event) => {
        this.context.addEvent(event);
        this.props.history.push(`/events`);
      })
      .catch((error) => {
        this.setState({ servErr: error });
      });
  };

  /**
   * @param globalOrganizations holds all organizations to select if event is associated with an organization
   * @param globalAnimals holds all animals to select if event is associated with an animal
   */

  render() {
    const { globalOrganizations = [], globalAnimals = [] } = this.context;
    return (
      <div className="event-content">
        <ErrorBoundary>
          <h1>Create an Event</h1>
          {this.state.servErr.length > 0 ? this.state.servErr : null}
          <form onSubmit={this.handleSubmit} action="#">
            <fieldset>
              <div>
                <label htmlFor="add-event-title">
                  Title{this.state.titleVer ? null : ": You must add a title."}
                </label>
              </div>
              <div>
                <input type="text" name="title" id="add-event-title" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-event-zipcode">
                  Zip Code
                  {this.state.zcVer ? null : ": You must add a zip code."}
                </label>
              </div>
              <div>
                <input type="text" name="zip_code" id="add-event-zipcode" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-event-type">
                  Type{this.state.typeVer ? null : ": You must add a type."}
                </label>
              </div>
              <div>
                <input type="text" name="type" id="add-event-type" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-event-desc">Description</label>
              </div>
              <div>
                <textarea type="text" name="description" id="add-event-desc" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-event-associan">Associated Animal</label>
              </div>
              <div>
                <select name="associatedAnimal" id="add-event-associan">
                  <option>...</option>
                  {globalAnimals.map((animal) => (
                    <option key={animal.id} value={animal.id}>
                      {animal.name} - {animal.zip_code}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-event-associorg">
                  Associated Organization
                </label>
              </div>
              <div>
                <select name="associatedOrganization" id="add-event-associorg">
                  <option>...</option>
                  {globalOrganizations.map((organization) => (
                    <option key={organization.id} value={organization.id}>
                      {organization.name} - {organization.zip_code}
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
