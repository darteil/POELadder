import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@blueprintjs/core';
import moment from 'moment';
import 'moment-duration-format';
import styles from '../Ladder/styles.css';

const Table = props => (
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
      {props.data.entries.map(entry => (
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
      ))}
      {props.data.entries.length === 0 && (
        <tr>
          <td colSpan="6">No results</td>
        </tr>
      )}
    </tbody>
  </table>
);

Table.propTypes = {
  data: PropTypes.shape({
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        account: PropTypes.shape({
          name: PropTypes.string
        }),
        character: PropTypes.shape({
          name: PropTypes.string.isRequired,
          class: PropTypes.string.isRequired
        }),
        online: PropTypes.bool.isRequired,
        rank: PropTypes.number.isRequired
      })
    )
  })
};

export default Table;
