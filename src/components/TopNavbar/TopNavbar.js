import React from "react";
import { NavLink } from "react-router-dom";

import "./TopNavbar.css";

export default function TopNavbar(props) {
  return (
    <div>
      <header className="safari-header">
        <NavLink className="" to="/">
          <span className="safari-home link-text">Home</span>
        </NavLink>
        <ul className="safari-navbar">
          <li>
            <NavLink to="/Animals">
              <span className="link-text span-a">Animals</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Events">
              <span className="link-text span-e">Events</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Chat">
              <span className="link-text span-c">Chat</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Organizations">
              <span className="link-text span-o">Organizations</span>
            </NavLink>
          </li>
        </ul>
      </header>
    </div>
  );
}
