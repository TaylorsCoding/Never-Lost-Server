import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AddOrganization from "./AddOrganization";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <AddOrganization />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
