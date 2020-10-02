import React, { Component } from "react";
import "../../index.css";
import "./AddAnimal.css";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import ApiContext from "../../APIcontext";
import config from "../../config";
/** 

Documentation

State Variables

@param {string} servErr Error returned from the server
@param {boolean} nameVer Whether a string has been entered into the name input
@param {boolean} speciesVer Whether a string has been entered into the species input
@param {boolean} zcVer Whether a string has been entered into the zip_code input
@param {boolean} lostVer Whether a string has been entered into the is_lost input
@param {boolean} colorVer Whether a string has been entered into the color input
@param {boolean} genderVer Whether a string has been entered into the gender input

@param defaultProps Contains @param history in order to allow for navigation after the post.

@function handleSubmit posts the data to create a new animal
  @param errCount counts the number of validation errors
  @param isLost contains data for boolean is_lost, as the event value is a string



*/
export default class AddAnimal extends Component {
  state = {
    servErr: "",
    nameVer: true,
    speciesVer: true,
    zcVer: true,
    lostVer: true,
    colorVer: true,
    genderVer: true,
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
    let isLost = false;

    if (e.target["in_shelter"].value === "...") {
      e.target["in_shelter"].value = 0;
    }

    if (e.target["name"].value.length === 0) {
      this.setState({ nameVer: false });
      errCount++;
    }
    if (e.target["species"].value.length === 0) {
      this.setState({ speciesVer: false });
      errCount++;
    }
    if (e.target["color"].value.length === 0) {
      this.setState({ colorVer: false });
      errCount++;
    }
    if (e.target["gender"].value.length === 0) {
      this.setState({ genderVer: false });
      errCount++;
    }
    if (e.target["zip_code"].value.length === 0) {
      this.setState({ zcVer: false });
      errCount++;
    }
    if (e.target["is_lost"].value.length === 0) {
      this.setState({ lostVer: false });
      errCount++;
    } else if (e.target["is_lost"].value === "yes") {
      isLost = true;
    }

    if (errCount > 0) {
      return;
    }

    const animal = {
      name: e.target["name"].value,
      species: e.target["species"].value,
      breed: e.target["breed"].value,
      color: e.target["color"].value,
      age: e.target["age"].value ? e.target["age"].value : null,
      gender: e.target["gender"].value,
      description: e.target["description"].value,
      zip_code: e.target["zip_code"].value,
      is_lost: isLost,
      in_shelter: parseInt(e.target["in_shelter"].value),
    };

    fetch(`${config.API_ENDPOINT}/animals`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(animal),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((e) => Promise.reject(e));
        }
        return response.json();
      })
      .then((animal) => {
        this.context.addAnimal(animal);
        this.props.history.push(`/animals`);
      })
      .catch((error) => {
        this.setState({ servErr: error });
      });
  };
  /**
   *
   * @param {Array} globalOrganizations contains all organizations. Is made available to select if animal is in a shelter
   *
   */

  render() {
    const { globalOrganizations = [] } = this.context;
    return (
      <ErrorBoundary>
        <div className="animal-content">
          <h1>Add an Animal!</h1>
          {this.state.servErr.length > 0 ? this.state.servErr : null}
          <form onSubmit={this.handleSubmit} action="#">
            <fieldset>
              <div>
                <label htmlFor="add-animal-name">
                  Name {this.state.nameVer ? null : ": You must add a name."}
                </label>
              </div>
              <div>
                <input type="text" name="name" id="add-animal-name" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-animal-species">
                  Species
                  {this.state.speciesVer ? null : ": You must add a species."}
                </label>
              </div>
              <div>
                <input type="text" name="species" id="add-animal-species" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-animal-breed">Breed</label>
                If you don't know the breed, you don't have to enter one.
              </div>
              <div>
                <input type="text" name="breed" id="add-animal-breed" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-animal-color">
                  Color{this.state.colorVer ? null : ": You must add a color."}
                </label>
              </div>
              <div>
                <input type="text" name="color" id="add-animal-color" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-animal-age">Age </label>
                If you don't know the age, don't worry about it.
              </div>
              <div>
                <input type="number" name="age" id="add-animal-age" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <legend>
                  Gender
                  {this.state.genderVer
                    ? null
                    : ": You must indicate a gender."}
                </legend>
              </div>
              <div>
                <label>
                  Male
                  <input type="radio" name="gender" value="Male" />
                </label>
              </div>
              <div>
                <label>
                  Female
                  <input type="radio" name="gender" value="Female" />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-animal-desc">
                  Add a description if you want.
                </label>
              </div>
              <div>
                <textarea name="description" id="add-animal-desc" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-animal-zipcode">
                  Zip Code{" "}
                  {this.state.zcVer ? null : ": You must add a zip code."}
                </label>
              </div>
              <div>
                <input type="text" name="zip_code" id="add-animal-zipcode" />
              </div>
            </fieldset>
            <fieldset>
              <div>
                <legend>
                  Is this animal lost?
                  {this.state.lostVer
                    ? null
                    : " You must indicate if it is lost."}
                </legend>
              </div>
              <div>
                <input
                  type="radio"
                  name="is_lost"
                  value="yes"
                  id="is_lost_yes"
                />
                <label htmlFor="is_lost_yes">Yes</label>
                <input type="radio" name="is_lost" value="no" id="is_lost_no" />
                <label htmlFor="is_lost_no">No</label>
              </div>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="add-animal-inshelter">
                  Is this animal in a shelter?
                </label>
              </div>
              <div> If it is, choose from a shelter below. </div>
              <select name="in_shelter" id="add-animal-inshelter">
                <option>...</option>
                {globalOrganizations.map((organization) => (
                  <option key={organization.id} value={organization.id}>
                    {organization.name} - {organization.zip_code}
                  </option>
                ))}
              </select>
            </fieldset>
            <button type="submit">Submit</button>
          </form>
        </div>
      </ErrorBoundary>
    );
  }
}
