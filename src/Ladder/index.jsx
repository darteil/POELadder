/* global fetch */
import React, { Component, Fragment } from 'react';
import { Button, Spinner, Icon } from '@blueprintjs/core';
import classNames from 'classnames';
import Header from '../Header';
import Pagination from '../Pagination';
import styles from './styles.css';

import eventsList from './eventsList';
import classesList from './classesList';


export default class Ladder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      dataLoaded: false,
      countRecords: 10,
      currentEvent: 'Betrayal',
      currentClass: 'all',
      currentPage: 1
    };

    this.fetchData = this.fetchData.bind(this);
    this.changePage = this.changePage.bind(this);
    this.selectEvent = this.selectEvent.bind(this);
    this.refreshTable = this.refreshTable.bind(this);
    this.selectCharacterClass = this.selectCharacterClass.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.state.currentEvent, this.state.currentClass, (this.state.currentPage * 15) - 15);
  }

  fetchData(eventId, classValue, offset) {
    this.setState({
      dataLoaded: false
    });

    const URL = classValue === 'all'
      ? `https://www.pathofexile.com/api/ladders?offset=${offset}&limit=15&id=${eventId}`
      : `https://www.pathofexile.com/api/ladders?offset=${offset}&limit=15&id=${eventId}&class=${classValue}`;

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
    this.fetchData(this.state.currentEvent, this.state.currentClass, (pageNumber * 15) - 15);
  }

  selectEvent(event) {
    const selectedEvent = event.target.value;
    this.setState({
      currentEvent: selectedEvent,
      currentPage: 1
    }, () => { this.refreshTable(); });
  }

  selectCharacterClass(event) {
    const characterClass = event.target.value;
    this.setState({
      currentClass: characterClass,
      currentPage: 1
    }, () => { this.refreshTable(); });
  }

  refreshTable() {
    this.fetchData(this.state.currentEvent, this.state.currentClass, (this.state.currentPage * 15) - 15);
  }

  render() {
    return (
      <Fragment>
        <Header>
          Ladder
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
                  Class
                  <div className="bp3-select">
                    <select id="class-select" value={this.state.currentClass} onChange={this.selectCharacterClass}>
                      {
                        classesList.map(classCharacter => (
                          <option key={classCharacter.value} value={classCharacter.value}>{classCharacter.text}</option>
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
                        <th>Level</th>
                        <th>Experience</th>
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
                            <td>{entry.character.level}</td>
                            <td>{entry.character.experience}</td>
                          </tr>
                        ))
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
