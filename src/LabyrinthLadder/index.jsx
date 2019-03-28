/* global fetch */
import React, { Component, Fragment } from 'react';
import { Button, Spinner, Icon } from '@blueprintjs/core';
import classNames from 'classnames';
import moment from 'moment';
import 'moment-duration-format';
import Header from '../Header';
import Pagination from '../Pagination';
import styles from '../Ladder/styles.css';

import eventsList from '../Ladder/eventsList';
import labTypes from './labTypes';


export default class LabyrinthLadder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      dataLoaded: false,
      countRecords: 10,
      currentEvent: 'Synthesis',
      currentLabType: 1,
      currentPage: 1
    };

    this.fetchData = this.fetchData.bind(this);
    this.changePage = this.changePage.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.refreshTable = this.refreshTable.bind(this);
    this.selectLabType = this.selectLabType.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.state.currentEvent, this.state.currentLabType, (this.state.currentPage * 15) - 15);
  }

  fetchData(eventId, labType, offset) {
    this.setState({
      dataLoaded: false
    });

    const URL = `https://www.pathofexile.com/api/ladders?offset=${offset}&limit=15&id=${eventId}&type=labyrinth&difficulty=${labType}`;

    fetch(URL)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          data,
          dataLoaded: true,
          countRecords: Math.ceil(data.total / 15)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  changePage(pageNumber) {
    this.setState({
      currentPage: pageNumber
    });
    this.fetchData(this.state.currentEvent, this.state.currentLabType, (pageNumber * 15) - 15);
  }

  selectEvent(event) {
    const selectedEvent = event.target.value;
    this.setState({
      currentEvent: selectedEvent,
      currentPage: 1
    }, () => { this.refreshTable(); });
  }

  selectLabType(event) {
    const type = event.target.value;
    this.setState({
      currentLabType: type,
      currentPage: 1
    }, () => { this.refreshTable(); });
  }

  refreshTable() {
    this.fetchData(this.state.currentEvent, this.state.currentLabType, (this.state.currentPage * 15) - 15);
  }

  render() {
    return (
      <Fragment>
        <Header>
          Labyrinth ladder
        </Header>
        <div className={styles['table-container']}>
          <div className={styles['table-wrapper']}>
            <div className={styles.filters}>
              <div>
                <label htmlFor="event-select" className={classNames('bp3-label', styles.label)}>
                  Event
                  <div className="bp3-select">
                    <select id="event-select" value={this.state.currentEvent} onChange={this.selectEvent}>
                      {
                        eventsList.map(event => (
                          <option key={event.value} value={event.value}>{event.text}</option>
                        ))
                      }
                    </select>
                  </div>
                </label>
                <label htmlFor="class-select" className={classNames('bp3-label', styles.label)}>
                  Labyrinth type
                  <div className="bp3-select">
                    <select id="class-select" value={this.state.currentLabType} onChange={this.selectLabType}>
                      {
                        labTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.text}</option>
                        ))
                      }
                    </select>
                  </div>
                </label>
              </div>
              <Button icon="refresh" onClick={this.refreshTable}>
                Refresh
              </Button>
            </div>
            <div className={classNames(styles.table, this.state.dataLoaded ? '' : styles.loading)}>
              {
                !this.state.dataLoaded
                && <div><Spinner intent="Primary" size={100} /></div>
              }
              {
                this.state.dataLoaded
                && (
                  <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-interactive bp3-small">
                    <thead>
                      <tr>
                        <th>Online</th>
                        <th>Rank</th>
                        <th>Account</th>
                        <th>Character</th>
                        <th>Class</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.dataLoaded
                        && this.state.data.entries.map(entry => (
                          <tr key={entry.rank}>
                            <td className={styles['online-column']}>
                              <Icon icon={entry.online ? 'endorsed' : 'remove'} />
                            </td>
                            <td>{entry.rank}</td>
                            <td>{entry.account.name}</td>
                            <td>{entry.character.name}</td>
                            <td>{entry.character.class}</td>
                            <td>{moment.duration(entry.time, 'seconds').format('hh:mm:ss')}</td>
                          </tr>
                        ))
                      }
                      {
                        this.state.data.entries.length === 0
                        && <tr><td colSpan="6">No results</td></tr>
                      }
                    </tbody>
                  </table>
                )
              }
            </div>
            <Pagination
              margin={2}
              page={this.state.currentPage}
              count={this.state.countRecords}
              onPageChange={this.changePage}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
