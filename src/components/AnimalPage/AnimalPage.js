import React, { Component } from "react";
import "./AnimalPage.css";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import { NavLink } from "react-router-dom";

/**
 * Documentation
 *
 * Page designed for single animal, displays all data related to the animal.
 *
 * @param defaultProps holds @param match holds @param params holds @param animal_id to get the id of the animal in the url
 */

export default class AnimalPage extends Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;
  /**
   * @param globalAnimals used to get the animal to display on the page with the @param animal_id
   * @param globalOrganizations used to get the shelter the animal is in, if it is in a shelter
   * @param animal is the animal found. its data is used to populate the page
   * @param org is the shelter found. its name is displayed with a link to the organization's page
   */
  render() {
    const { globalAnimals = [], globalOrganizations = [] } = this.context;
    const { animal_id } = this.props.match.params;
    const animal = globalAnimals.find(
      (animal) => animal.id === parseInt(animal_id)
    );
    const org = globalOrganizations.find(
      (org) => org.id === (animal ? parseInt(animal.in_shelter) : null)
    );

    return (
      <ErrorBoundary>
        <div className="animal-content">
          <h1>{animal ? animal.name : null}</h1>
          <p>
            Species:{" "}
            <span className="light-text">{animal ? animal.species : null}</span>
          </p>
          <p>
            Breed:{" "}
            <span className="light-text">{animal ? animal.breed : null}</span>
          </p>
          <p>
            Color:{" "}
            <span className="light-text">{animal ? animal.color : null}</span>
          </p>
          <p>
            Age:{" "}
            <span className="light-text">{animal ? animal.age : null}</span>
          </p>
          <p>
            Gender:{" "}
            <span className="light-text">{animal ? animal.gender : null}</span>
          </p>
          {animal ? (
            <>
              <p>Description </p>
              <p>
                <span className="light-text">
                  {animal ? animal.description : null}
                </span>
              </p>
            </>
          ) : null}
          <p>
            Zip-Code:{" "}
            <span className="light-text">
              {animal ? animal.zip_code : null}
            </span>
          </p>
          <p>
            Is this animal lost?{" "}
            <span className="light-text">
              {animal ? (animal.is_lost ? "Yes" : "No") : null}
            </span>
          </p>
          <div>
            <p>
              Is this animal in a shelter?{" "}
              {animal ? (
                org ? (
                  <>
                    <span className="light-text">
                      Yes, {`${animal.gender === "Male" ? "he" : "she"}`} is
                      being taken good care of by{" "}
                    </span>

                    <NavLink to={`/organizations/${org.id}`}>
                      {org.name}
                    </NavLink>
                  </>
                ) : (
                  "No"
                )
              ) : null}
            </p>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
