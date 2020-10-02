import React, { Component } from "react";
import "./Animals.css";
import "../../index.css";

import Animal from "../Animal/Animal";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import { NavLink } from "react-router-dom";
/**
 * Documentation
 * @class
 *
 * @param contextType refers to all data in ApiContext
 *
 * @param globalAnimals holds all animals
 * @param localAnimals holds animals in current zip code and zip code in range +- 500
 */
export default class Animals extends Component {
  static contextType = ApiContext;

  render() {
    // global and local animals are both pulled if they exist
    // local animals will only exist if there is a zipcode on file
    // local animals displays first, but global animals always displays.
    const { globalAnimals = [], localAnimals = [] } = this.context;

    return (
      <div className="animal-content">
        <ErrorBoundary>
          <div className="animals-main">
            <h1>Animals</h1>
            <div className="add-button">
              <NavLink to="/create-animal">
                <button>Add an Animal!</button>
              </NavLink>
            </div>
            {localAnimals.length > 0 ? (
              <>
                <h1>Local Animals</h1>
                {localAnimals.map((animal) => (
                  <Animal
                    id={animal.id}
                    key={animal.id}
                    name={animal.name}
                    species={animal.species}
                    breed={animal.breed}
                    color={animal.color}
                    age={animal.age}
                    gender={animal.gender}
                    description={animal.description}
                    zip_code={animal.zip_code}
                    is_lost={animal.is_lost ? "Yes" : "No"}
                    in_shelter={animal.in_shelter ? "Yes" : "No"}
                  />
                ))}
              </>
            ) : null}
            <h1>All Animals</h1>
            {globalAnimals.map((animal) => (
              <Animal
                id={animal.id}
                key={animal.id}
                name={animal.name}
                species={animal.species}
                breed={animal.breed}
                color={animal.color}
                age={animal.age}
                gender={animal.gender}
                description={animal.description}
                zip_code={animal.zip_code}
                is_lost={animal.is_lost ? "Yes" : "No"}
                in_shelter={animal.in_shelter ? "Yes" : "No"}
              />
            ))}
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}
