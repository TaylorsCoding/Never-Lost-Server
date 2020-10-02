import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import EventComponent from "./EventComponent";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <EventComponent />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
