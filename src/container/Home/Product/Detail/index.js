import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../../../AppContext';
import css from './index.module.scss';
import Back from '../../../../asset/png/Back-Black.png';
import withMobile from '../../../withMobile';

function checkAndAddToPurchase(source, obj) {
  for (let i = 0; i < source.length; i += 1) {
    if (source[i].id === obj.id) {
      // eslint-disable-next-line no-param-reassign
      source[i] = obj;
      return; // exit loop and function
    }
  }
  source.push(obj);
}

function addToPurchase(source) {
  let finalPurchase = [];
  if (localStorage.getItem('purchase')) {
    finalPurchase = JSON.parse(localStorage.getItem('purchase'));
  }
  checkAndAddToPurchase(finalPurchase, source);
  localStorage.setItem('purchase', JSON.stringify(finalPurchase));
  alert('Product successfully bought');
}

const ProductDetail = () => {
  const history = useHistory();
  const { detailProduct } = useContext(AppContext);
  const { description, image, id, title, price } = detailProduct;
  return (
    <div className={css.wrapper}>
      <div
        onClick={() => {
          history.push('/');
        }}
      >
        <img className={css.backImage} src={Back} alt="back_image" />
      </div>
      <div>
        <img src={image} alt="product_detail_image" />
      </div>
      <div className={css.description}>{description}</div>
      <div>
        <button
          type="button"
          onClick={() => {
            addToPurchase({
              image,
              description,
              id,
              title,
              price,
            });
            history.push('/profile');
          }}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default withMobile(ProductDetail);
