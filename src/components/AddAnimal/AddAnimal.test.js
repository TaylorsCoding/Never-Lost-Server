import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AddAnimal from "./AddAnimal";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <AddAnimal />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
