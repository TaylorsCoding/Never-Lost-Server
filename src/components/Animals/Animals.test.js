import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Animals from "./Animals";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Animals />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
