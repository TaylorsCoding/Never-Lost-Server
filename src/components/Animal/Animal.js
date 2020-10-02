import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { NavLink } from "react-router-dom";

// This component is responsible for displaying each animal on the animals page.
/**
 * @param props.breed is only entered if it exists
 * @param props.age is only entered if it exists
 * @param props.description is only entered if it exists
 */

export default function Animal(props) {
  return (
    <ErrorBoundary>
      <NavLink to={`/animals/${props.id}`}>
        <h3>{props.name}</h3>
      </NavLink>
      <p>Species: {props.species}</p>
      <p>Color: {props.color}</p>
      <p>Gender: {props.gender}</p>
      <p>Zip Code: {props.zip_code}</p>
      {props.breed ? <p>Breed: {props.breed}</p> : null}
      {props.age ? <p>Age: {props.age}</p> : null}
      {props.description ? <p>Description: {props.description}</p> : null}
      <p>Is this animal lost? {props.is_lost}</p>
      <p>Is this animal in a shelter? {props.in_shelter}</p>
    </ErrorBoundary>
  );
}
