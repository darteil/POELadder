import React from 'react';
import { Icon } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Table = props => (
  <table className="bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-interactive bp3-small">
    <thead>
      <tr>
        <th>Online</th>
        <th>Rank</th>
        <th>Account</th>
        <th>Character</th>
        <th>Subclass</th>
        <th>Level</th>
        <th>Experience</th>
      </tr>
    </thead>
    <tbody className={props.isHardcoreEvent ? styles.hard : ''}>
      {props.data.entries.map(entry => (
        <tr key={entry.rank} data-dead={entry.dead ? 'dead' : 'alive'}>
          <td className={styles['online-column']}>
            <Icon icon={entry.online ? 'endorsed' : 'remove'} />
          </td>
          <td>{entry.rank}</td>
          <td>{entry.account.name}</td>
          <td className={styles['character-name']}>
            {entry.character.name}
            {props.isHardcoreEvent && <span>{entry.dead ? '(dead)' : ''}</span>}
          </td>
          <td>{entry.character.class}</td>
          <td>{entry.character.level}</td>
          <td>{entry.character.experience}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

Table.propTypes = {
  isHardcore: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        account: PropTypes.shape({
          name: PropTypes.string,
        }),
        character: PropTypes.shape({
          name: PropTypes.string.isRequired,
          class: PropTypes.string.isRequired,
          level: PropTypes.number.isRequired,
          experience: PropTypes.number.isRequired,
        }),
        dead: PropTypes.bool.isRequired,
        online: PropTypes.bool.isRequired,
        rank: PropTypes.number.isRequired,
      }),
    ),
  }),
};

export default Table;
