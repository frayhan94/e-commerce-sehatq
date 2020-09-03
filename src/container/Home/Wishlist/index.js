import React from 'react';
import withMobile from '../../withMobile';
import css from './index.module.scss';

const RenderItem = ({ data }) => {
  return data.map(value => {
    const { image, price, title } = value;
    return (
      <div className={css.item}>
        <img src={image} alt="image_product" className={css.image} />
        <div className={css.description}>
          <div>{title}</div>
          <div>{price}</div>
        </div>
      </div>
    );
  });
};
const Wishlist = () => {
  let wishlistItem = [];
  if (localStorage.getItem('wishlist')) {
    wishlistItem = JSON.parse(localStorage.getItem('wishlist'));
  }
  return (
    <div className={css.wrapper}>
      <h4>Wishlist</h4>
      {wishlistItem.length === 0 ? <div>Item not found</div> : <RenderItem data={wishlistItem} />}
    </div>
  );
};

export default withMobile(Wishlist);
