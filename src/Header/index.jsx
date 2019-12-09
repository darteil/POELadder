import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Header = props => (
  <div className={styles.heading}>
    <h1 className="bp3-heading">{props.children}</h1>
  </div>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
