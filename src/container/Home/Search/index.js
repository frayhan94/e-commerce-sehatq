import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import close from '../../../asset/svg/close.svg';
import withMobile from '../../withMobile';
import AppContext from '../../../AppContext';
import css from './index.module.scss';

const Search = () => {
  const history = useHistory();
  const { allProduct, setDetailProduct } = useContext(AppContext);
  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <div
          onClick={() => {
            history.push('/');
          }}
        >
          <img src={close} alt="close_image" className={css.close} />
        </div>
        <div>
          <input type="text" className={css.searchInput} />
        </div>
      </div>

      <div>
        {Object.keys(allProduct).length > 0 &&
          allProduct.map(value => {
            const { imageUrl, title, description, price } = value;
            return (
              <div
                className={css.wrapperItemSearch}
                onClick={() => {
                  setDetailProduct({
                    description,
                    image: imageUrl,
                  });
                  history.push(`detail/${title}`);
                }}
              >
                <img src={imageUrl} alt="image_product" className={css.image} />
                <div className={css.description}>
                  <div className={css.productName}>{title}</div>
                  <div>{price}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default withMobile(Search);
