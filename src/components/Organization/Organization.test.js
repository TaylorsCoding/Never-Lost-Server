import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Organization from "./Organization";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Organization />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
