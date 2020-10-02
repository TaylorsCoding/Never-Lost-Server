import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Events from "./Events";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Events />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
