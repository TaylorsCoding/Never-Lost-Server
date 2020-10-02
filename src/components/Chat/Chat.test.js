import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Chat from "./Chat";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Chat />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
