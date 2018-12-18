import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorComponent from './ErrorComponent';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      info: null,
      error: null
    };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorComponent>
          <p>Wrong</p>
          <h1>Oops!!! Something went wrong</h1>
          <p>The error: {this.state.error.toString()}</p>
          <p>Where it occured: {this.state.info.componentStack}</p>
        </ErrorComponent>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};
