import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Pagination = props => {
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(3);

  useEffect(() => {
    setStartPage(props.page > props.margin + 2 ? props.page - props.margin : 1);
    setEndPage(props.page + (props.margin + 2) > props.count ? props.count : props.page + props.margin);
  });

  const onPageChange = event => {
    const index = Array.prototype.indexOf.call(event.target.parentNode.children, event.target);
    props.onPageChange(index + startPage);
  };

  const goFirstPage = () => {
    props.onPageChange(1);
  };

  const goLastPage = () => {
    props.onPageChange(props.count);
  };

  const goPrevPage = () => {
    props.onPageChange(props.page - 1);
  };

  const goNextPage = () => {
    props.onPageChange(props.page + 1);
  };

  const pages = [];

  const firstPage =
    props.page - props.margin > 2 ? (
      <button type="button" className="bp3-button" onClick={goFirstPage}>
        1
      </button>
    ) : null;

  const lastPage =
    props.page + props.margin + 1 < props.count ? (
      <button type="button" className="bp3-button" onClick={goLastPage}>
        {props.count}
      </button>
    ) : null;

  const prevPage =
    props.page === 1 ? null : (
      <button type="button" className="bp3-button bp3-icon-chevron-left" onClick={goPrevPage} />
    );

  const nextPage =
    props.page === props.count ? null : (
      <button type="button" className="bp3-button bp3-icon-chevron-right" onClick={goNextPage} />
    );

  const prevSpreadBlock =
    props.page - props.margin > 2 ? (
      <button type="button" className="bp3-button bp3-disabled">
        ...
      </button>
    ) : null;

  const lastSpreadBlock =
    props.page + props.margin + 1 < props.count ? (
      <button type="button" className="bp3-button bp3-disabled">
        ...
      </button>
    ) : null;

  for (let i = startPage; i <= endPage; i += 1) {
    pages.push(
      <button
        key={i}
        type="button"
        className={classNames('bp3-button', props.page === i ? 'bp3-active' : '')}
        onClick={onPageChange}
      >
        {i}
      </button>,
    );
  }

  return (
    <div className={styles.pagination}>
      {prevPage}
      {firstPage}
      {prevSpreadBlock}
      <ul className={styles['pages-list']}>{pages}</ul>
      {lastSpreadBlock}
      {lastPage}
      {nextPage}
    </div>
  );
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
