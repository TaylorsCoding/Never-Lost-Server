import React, { Component } from "react";

/**
 * Documentation
 *
 * @class ErrorBoundary
 *
 * @param hasError indicates whether error has occurred
 * @param error holds error info
 *
 * @function getDerivedStateFromError catches the fact that an error has occurred
 * @function componentDidCatch retrieves error info after catching error
 */

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: "" };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: `\n${error}\n${errorInfo}` });
  }

  render() {
    if (this.state.hasError) {
      return <h1>An error has occurred: {this.state.error}</h1>;
    }
    return this.props.children;
  }
}
