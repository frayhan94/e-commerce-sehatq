import React from 'react';
import { useHistory } from 'react-router-dom';
import css from './Home/index.module.scss';

const footerItem = [
  {
    link: '/',
    text: 'Home',
  },
  {
    link: '/feed',
    text: 'Feed',
  },
  {
    link: '/cart',
    text: 'Cart',
  },
  {
    link: '/profile',
    text: 'Profile',
  },
];

const RenderFooter = ({ item }) => {
  const history = useHistory();
  return (
    <div className={css.footer}>
      {item.map(value => {
        const { link, text } = value;
        return (
          <div
            key={link}
            onClick={() => {
              history.push(link);
            }}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
};
const withMobile = WrappedComponent => props => {
  return (
    <div className={css.wrapper}>
      <WrappedComponent {...props} />
      <RenderFooter item={footerItem} />
    </div>
  );
};

export default withMobile;
