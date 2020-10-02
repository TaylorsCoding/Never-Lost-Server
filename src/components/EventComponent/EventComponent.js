import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { NavLink } from "react-router-dom";

/**
 * Documentation
 *
 * Used to populate events page with individual event data.
 *
 *
 * @param {*} props contains information about the individual event
 */

export default function EventComponent(props) {
  return (
    <ErrorBoundary>
      <NavLink to={`/event/${props.id}`}>
        <h3>{props.title}</h3>
      </NavLink>
      <p>Zip Code: {props.zip_code}</p>
      <p>Type: {props.type}</p>
      <p>Description: {props.description}</p>
      {props.animal_id ? <p>Animal: {props.animal_id}</p> : null}
      {props.org_id ? <p>Organization: {props.org_id}</p> : null}
      <p>Date Published: {props.date_published}</p>
    </ErrorBoundary>
  );
}
