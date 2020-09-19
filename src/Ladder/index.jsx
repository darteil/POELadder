/* global fetch */
import React, { useState, useEffect } from 'react';
import { Button, Spinner, Card, Elevation } from '@blueprintjs/core';
import classNames from 'classnames';
import Header from '../Header';
import Pagination from '../Pagination';
import Table from './Table';
import styles from './styles.css';

import eventsList from './eventsList';
import classesList from './classesList';

const Ladder = () => {
  const [payload, setPayload] = useState({
    data: {},
    loaded: false,
    records: 10
  });

  const [filter, setFilter] = useState({
    isHardcore: false,
    class: 'all',
    page: 1,
    event: 'Heist'
  });

  const fetchData = (eventId, classValue, offset) => {
    setPayload({
      ...payload,
      loaded: false
    });

    const URL =
      classValue === 'all'
        ? `https://www.pathofexile.com/api/ladders?offset=${offset}&limit=15&id=${eventId}`
        : `https://www.pathofexile.com/api/ladders?offset=${offset}&limit=15&id=${eventId}&class=${classValue}`;

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setPayload({
          data,
          loaded: true,
          records: Math.ceil(data.total / 15)
        });
      });
  };

  const refreshTable = () => {
    fetchData(filter.event, filter.class, filter.page * 15 - 15);
  };

  useEffect(() => {
    refreshTable();
  }, [filter]);

  const changePage = pageNumber => {
    setFilter({
      ...filter,
      page: pageNumber
    });
  };

  const selectEvent = event => {
    const selectedEvent = event.target.value;
    const isHardcore =
      selectedEvent === 'Hardcore+Heist' ||
      selectedEvent === 'SSF+Heist+HC' ||
      selectedEvent === 'Hardcore' ||
      selectedEvent === 'SSF+Hardcore';

    setFilter({
      ...filter,
      event: selectedEvent,
      isHardcore,
      page: 1
    });
  };

  const selectCharacterClass = event => {
    setFilter({
      ...filter,
      class: event.target.value,
      page: 1
    });
  };

  return (
    <>
      <Header>Ladder</Header>
      <Card elevation={Elevation.THREE}>
        <div className={styles['table-container']}>
          <div className={styles['table-wrapper']}>
            <div className={styles.filters}>
              <div>
                <label htmlFor="event-select" className={classNames('bp3-label', styles.label)}>
                  Event
                  <div className="bp3-select">
                    <select id="event-select" value={filter.event} onChange={selectEvent}>
                      {eventsList.map(event => (
                        <option key={event.value} value={event.value}>
                          {event.text}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
                <label htmlFor="class-select" className={classNames('bp3-label', styles.label)}>
                  Class
                  <div className="bp3-select">
                    <select id="class-select" value={filter.class} onChange={selectCharacterClass}>
                      {classesList.map(classCharacter => (
                        <option key={classCharacter.value} value={classCharacter.value}>
                          {classCharacter.text}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>
              <Button icon="refresh" onClick={refreshTable}>
                Refresh
              </Button>
            </div>
            <div className={classNames(styles.table, payload.loaded ? '' : styles.loading)}>
              {!payload.loaded && (
                <div>
                  <Spinner intent="Primary" size={100} />
                </div>
              )}
              {payload.loaded && <Table isHardcore={filter.isHardcore} data={payload.data} />}
            </div>
            <Pagination margin={2} page={filter.page} count={payload.records} onPageChange={changePage} />
          </div>
        </div>
      </Card>
    </>
  );
};

export default Ladder;
