/* global fetch */
import React, { useState, useEffect, useCallback } from "react";
import { Button, Spinner, Icon } from "@blueprintjs/core";
import classNames from "classnames";
import Header from "../Header";
import Pagination from "../Pagination";
import Table from "./Table";
import styles from "./styles.css";

import eventsList from "./eventsList";
import classesList from "./classesList";

const Ladder = () => {
  const [payload, setPayload] = useState({
    data: [],
    dataLoaded: false,
    countRecords: 10
  });

  const [filter, setFilter] = useState({
    isHardcore: false,
    currentClass: "all",
    currentPage: 1,
    currentEvent: "Blight"
  });

  const fetchData = (eventId, classValue, offset) => {
    setPayload({
      ...payload,
      dataLoaded: false
    });

    const URL =
      classValue === "all"
        ? `https://www.pathofexile.com/api/ladders?offset=${offset}&limit=15&id=${eventId}`
        : `https://www.pathofexile.com/api/ladders?offset=${offset}&limit=15&id=${eventId}&class=${classValue}`;

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setPayload({
          data,
          dataLoaded: true,
          countRecords: Math.ceil(data.total / 15)
        });
      });
  };

  useEffect(() => {
    refreshTable();
  }, [filter]);

  const changePage = pageNumber => {
    setFilter({
      ...filter,
      currentPage: pageNumber
    });
  };

  const selectEvent = event => {
    const selectedEvent = event.target.value;
    const isHardcore =
      selectedEvent === "Hardcore+Blight" ||
      selectedEvent === "SSF+Blight+HC" ||
      selectedEvent === "Hardcore" ||
      selectedEvent === "SSF+Hardcore";

    setFilter({
      ...filter,
      currentEvent: selectedEvent,
      isHardcore,
      currentPage: 1
    });
  };

  const selectCharacterClass = event => {
    setFilter({
      ...filter,
      currentClass: event.target.value,
      currentPage: 1
    });
  };

  const refreshTable = () => {
    fetchData(
      filter.currentEvent,
      filter.currentClass,
      filter.currentPage * 15 - 15
    );
  };

  console.log("render");

  return (
    <>
      <Header>Ladder</Header>
      <div className={styles["table-container"]}>
        <div className={styles["table-wrapper"]}>
          <div className={styles.filters}>
            <div>
              <label
                htmlFor="event-select"
                className={classNames("bp3-label", styles.label)}
              >
                Event
                <div className="bp3-select">
                  <select
                    id="event-select"
                    value={filter.currentEvent}
                    onChange={selectEvent}
                  >
                    {eventsList.map(event => (
                      <option key={event.value} value={event.value}>
                        {event.text}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
              <label
                htmlFor="class-select"
                className={classNames("bp3-label", styles.label)}
              >
                Class
                <div className="bp3-select">
                  <select
                    id="class-select"
                    value={filter.currentClass}
                    onChange={selectCharacterClass}
                  >
                    {classesList.map(classCharacter => (
                      <option
                        key={classCharacter.value}
                        value={classCharacter.value}
                      >
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
          <div
            className={classNames(
              styles.table,
              payload.dataLoaded ? "" : styles.loading
            )}
          >
            {!payload.dataLoaded && (
              <div>
                <Spinner intent="Primary" size={100} />
              </div>
            )}
            {payload.dataLoaded && (
              <Table isHardcore={filter.isHardcore} data={payload.data} />
            )}
          </div>
          <Pagination
            margin={2}
            page={filter.currentPage}
            count={payload.countRecords}
            onPageChange={changePage}
          />
        </div>
      </div>
    </>
  );
};

export default Ladder;
