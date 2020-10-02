import React from "react";
import "./Post.css";

import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

export default function Post(props) {
  return (
    <ErrorBoundary>
      <div className="post-container">
        <p class="post">{props.content}</p>
        <footer>Date Published: {props.date_published}</footer>
      </div>
    </ErrorBoundary>
  );
}
