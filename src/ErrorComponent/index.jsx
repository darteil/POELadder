import React from 'react';
import PropTypes from 'prop-types';

const ErrorComponent = props => (
  <div>
    {props.children}
  </div>
);

ErrorComponent.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorComponent;
