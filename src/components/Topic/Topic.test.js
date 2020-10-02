import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Topic from "./Topic";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Topic />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
