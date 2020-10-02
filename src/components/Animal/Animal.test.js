import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Animal from "./Animal";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Animal />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
