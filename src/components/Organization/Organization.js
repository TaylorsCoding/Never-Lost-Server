import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { NavLink } from "react-router-dom";

export default function Organization(props) {
  return (
    <ErrorBoundary>
      <NavLink to={`/organizations/${props.id}`}>
        <h1>{props.name}</h1>
      </NavLink>
      <p>Type: {props.type}</p>
      <p>Description: {props.description}</p>
      <p>Zip Code: {props.zip_code}</p>
      {props.address ? <p>Address: {props.address}</p> : null}
      {props.website ? <p>Website: {props.website}</p> : null}
      {props.phone_number ? <p>Phone Number: {props.phone_number}</p> : null}
    </ErrorBoundary>
  );
}
