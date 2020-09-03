import React from 'react';
import PropTypes from 'prop-types';
import styles from './grid.module.scss';

const Grid = props => {
  const { children, justifyCenter, split } = props;

  let createClassName = [styles.Grid];
  if (justifyCenter) {
    createClassName.push(styles.justifyCenter);
  }
  if (split) {
    createClassName.push(styles[`split--${split}`]);
  }
  createClassName = createClassName.join(' ');

  return <div className={createClassName}>{children}</div>;
};

Grid.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  justifyCenter: PropTypes.bool,
  split: PropTypes.number,
};

Grid.defaultProps = {
  justifyCenter: false,
  split: 1,
};

export default Grid;
