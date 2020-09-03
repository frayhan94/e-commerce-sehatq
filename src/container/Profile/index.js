import React from 'react';
import withMobile from '../withMobile';
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
const Profile = () => {
  let purchaseItem = [];
  if (localStorage.getItem('purchase')) {
    purchaseItem = JSON.parse(localStorage.getItem('purchase'));
  }
  return (
    <div className={css.wrapper}>
      <h4>Purchase</h4>
      {purchaseItem.length === 0 ? <div>Item not found</div> : <RenderItem data={purchaseItem} />}
    </div>
  );
};

export default withMobile(Profile);
