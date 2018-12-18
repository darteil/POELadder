import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.css';

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <nav className={classNames('bp3-navbar bp3-dark', styles['no-select'])}>
        <div className="bp3-navbar-group bp3-align-left">
          <div className="bp3-navbar-heading">Path of Exile ladder</div>
          <span className="bp3-navbar-divider" />
          <button
            type="button"
            className="bp3-button bp3-minimal bp3-icon-layout-grid"
            onClick={() => { this.props.history.push('/'); }}
          >
            Ladder
          </button>
          <button
            type="button"
            className="bp3-button bp3-minimal bp3-icon-layout-auto"
            onClick={() => { this.props.history.push('/lab-ladder'); }}
          >
            Lab Ladder
          </button>
        </div>
      </nav>
    );
  }
}

Menu.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(Menu);
