import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Organizations from "./Organizations";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Organizations />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
