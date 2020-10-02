import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AddTopic from "./AddTopic";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <AddTopic />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
