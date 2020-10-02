import React from "react";

import "./Title.css";

export default function Title(props) {
  return (
    <div className="whole-title">
      <img
        className="first-image"
        src={require("./istockphoto-494663674-170667a.jpg")}
        alt="dogs"
      />
      <div className="website-title title-element">
        <h1 className="title-itself">Never Lost</h1>
      </div>
      <img
        className="second-image"
        src={require("./preview.jpg")}
        width="32%"
        height="1%"
        alt="cats"
      />
    </div>
  );
}
