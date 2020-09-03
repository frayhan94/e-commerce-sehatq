import React from 'react';
import PropTypes from 'prop-types';
import styles from './card.module.scss';

const Card = props => {
  const { children, alignCenter, justifyCenter } = props;

  let createClassName = [styles.Card];
  if (alignCenter) {
    createClassName.push(styles.alignCenter);
  }
  if (justifyCenter) {
    createClassName.push(styles.justifyCenter);
  }

  createClassName = createClassName.join(' ');

  return <div className={createClassName}>{children}</div>;
};

Card.Media = props => {
  const { children } = props;
  return <div className={styles.cardMedia}>{children}</div>;
};

Card.Header = props => {
  const { children } = props;
  return <div>{children}</div>;
};

Card.Body = props => {
  const { children } = props;
  return <div className={styles.Chat__Body}>{children}</div>;
};

Card.Footer = props => {
  const { children } = props;
  return <div>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  alignCenter: PropTypes.bool,
  justifyCenter: PropTypes.bool,
};

Card.defaultProps = {
  alignCenter: false,
  justifyCenter: false,
};

Card.Media.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};
Card.Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};
Card.Body.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};
Card.Footer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default Card;
