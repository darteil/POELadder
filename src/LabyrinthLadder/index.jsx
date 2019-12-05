/* global fetch */
import React, { useState, useEffect } from 'react';
import { Button, Spinner, Card, Elevation } from '@blueprintjs/core';
import classNames from 'classnames';
import Header from '../Header';
import Table from './Table';
import Pagination from '../Pagination';
import styles from '../Ladder/styles.css';

import eventsList from '../Ladder/eventsList';
import labTypes from './labTypes';

const LabyrinthLadder = () => {
  const [payload, setPayload] = useState({
    data: {},
    loaded: false,
    records: 10,
  });

  const [filter, setFilter] = useState({
    event: 'Blight',
    labType: 1,
    page: 1,
  });

  const fetchData = (eventId, labType, offset) => {
    setPayload({
      ...payload,
      loaded: false,
    });

    const URL = `https://www.pathofexile.com/api/ladders?offset=${offset}&limit=15&id=${eventId}&type=labyrinth&difficulty=${labType}`;

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setPayload({
          data,
          loaded: true,
          records: Math.ceil(data.total / 15),
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  const refreshTable = () => {
    fetchData(filter.event, filter.labType, filter.page * 15 - 15);
  };

  useEffect(() => {
    refreshTable();
  }, [filter]);

  const changePage = pageNumber => {
    setFilter({
      ...filter,
      page: pageNumber,
    });
  };

  const selectEvent = event => {
    setFilter({
      ...filter,
      event: event.target.value,
      page: 1,
    });
  };

  const selectLabType = event => {
    setFilter({
      ...filter,
      labType: event.target.value,
      page: 1,
    });
  };

  return (
    <>
      <Header>Labyrinth ladder</Header>
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
                  Labyrinth type
                  <div className="bp3-select">
                    <select id="class-select" value={filter.labType} onChange={selectLabType}>
                      {labTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.text}
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
              {payload.loaded && <Table data={payload.data} />}
            </div>
            <Pagination margin={2} page={filter.page} count={payload.records} onPageChange={changePage} />
          </div>
        </div>
      </Card>
    </>
  );
};

export default LabyrinthLadder;
