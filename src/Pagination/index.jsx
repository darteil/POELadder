import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.css';

export default class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startPage: 1,
      endPage: 3,
      count: 10,
      page: 1
    };

    this.onPageChange = this.onPageChange.bind(this);
    this.goFirstPage = this.goFirstPage.bind(this);
    this.goLastPage = this.goLastPage.bind(this);
    this.goPrevPage = this.goPrevPage.bind(this);
    this.goNextPage = this.goNextPage.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.count === nextProps.count && prevState.page === nextProps.page) return null;

    const { page, margin, count } = nextProps;
    const startPage = page > (margin + 2) ? page - margin : 1;
    const endPage = page + (margin + 2) > count ? count : page + margin;
    return {
      startPage, endPage, count, page
    };
  }

  onPageChange(event) {
    const index = Array.prototype.indexOf.call(event.target.parentNode.children, event.target);
    this.props.onPageChange(index + this.state.startPage);
  }

  goFirstPage() {
    this.props.onPageChange(1);
  }

  goLastPage() {
    this.props.onPageChange(this.state.count);
  }

  goPrevPage() {
    this.props.onPageChange(this.props.page - 1);
  }

  goNextPage() {
    this.props.onPageChange(this.props.page + 1);
  }

  render() {
    if (this.state.count === 0 || this.state.count <= 15) return null;

    const { startPage, endPage, count } = this.state;
    const { page, margin } = this.props;
    const pages = [];

    const firstPage = page - margin > 2 ? (
      <button type="button" className="bp3-button" onClick={this.goFirstPage}>1</button>
    ) : null;


    const lastPage = (page + margin) + 1 < count ? (
      <button type="button" className="bp3-button" onClick={this.goLastPage}>{count}</button>
    ) : null;

    const prevPage = page === 1 ? null : (
      <button type="button" className="bp3-button bp3-icon-chevron-left" onClick={this.goPrevPage} />
    );

    const nextPage = page === count ? null : (
      <button type="button" className="bp3-button bp3-icon-chevron-right" onClick={this.goNextPage} />
    );

    const prevSpreadBlock = page - margin > 2 ? (
      <button type="button" className="bp3-button bp3-disabled">...</button>
    ) : null;

    const lastSpreadBlock = (page + margin) + 1 < count ? (
      <button type="button" className="bp3-button bp3-disabled">...</button>
    ) : null;

    for (let i = startPage; i <= endPage; i += 1) {
      pages.push(
        <button
          key={i}
          type="button"
          className={classNames('bp3-button', (this.props.page === i) ? 'bp3-active' : '')}
          onClick={this.onPageChange}
        >
          {i}
        </button>
      );
    }

    return (
      <div className={styles.pagination}>
        {prevPage}
        {firstPage}
        {prevSpreadBlock}
        <ul className={styles['pages-list']}>
          {pages}
        </ul>
        {lastSpreadBlock}
        {lastPage}
        {nextPage}
      </div>
    );
  }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};
