import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Title from "./Title";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Title />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
