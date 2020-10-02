import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <ErrorBoundary>
        <div></div>
      </ErrorBoundary>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
