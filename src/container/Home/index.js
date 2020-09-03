import React, { useEffect, useReducer, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import css from './index.module.scss';
import withMobile from '../withMobile';
import Love from '../../asset/svg/icons8-love.svg';
import LoveWhite from '../../asset/svg/icons8-love-white.svg';
import AppContext from '../../AppContext';

function checkAndAddToWishlist(source, obj) {
  for (let i = 0; i < source.length; i += 1) {
    if (source[i].id === obj.id) {
      // eslint-disable-next-line no-param-reassign
      source[i] = obj;
      return; // exit loop and function
    }
  }
  source.push(obj);
}

function addToWishlist(source) {
  let finalWishlist = [];
  if (localStorage.getItem('wishlist')) {
    finalWishlist = JSON.parse(localStorage.getItem('wishlist'));
  }
  checkAndAddToWishlist(finalWishlist, source);
  localStorage.setItem('wishlist', JSON.stringify(finalWishlist));
  alert('Successfully add to wishlist');
}

const RenderHeader = () => {
  const history = useHistory();
  return (
    <div className={css.header}>
      <div
        className={css.loveWrapper}
        onClick={() => {
          history.push('/wishlist');
        }}
      >
        <img className={css.imgLoveWishlist} src={Love} alt="love_wishlist" />
      </div>
      <div className={css.searchInputWrapper}>
        <input
          type="text"
          className={css.searchInput}
          onFocus={() => {
            history.push('/search');
          }}
        />
      </div>
    </div>
  );
};

const initialState = {
  loading: true,
  error: false,
  data: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...initialState,
        loading: false,
        data: action.payload,
      };

    case 'FETCH_ERROR':
      return {
        ...initialState,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

const RenderProduct = ({ data, setDetailProduct }) => {
  const history = useHistory();
  return data.length > 0
    ? data.map(value => {
        const { imageUrl, title, description, price, id } = value;
        return (
          <div className={css.productItemWrapper}>
            <div
              onClick={() => {
                setDetailProduct({
                  description,
                  id,
                  title,
                  price,
                  image: imageUrl,
                });
                history.push(`detail/${title}`);
              }}
            >
              <img src={imageUrl} alt="image_product" />
            </div>
            <div className={css.productDescriptionWrapper}>
              <div
                onClick={() => {
                  setDetailProduct({
                    description,
                    id,
                    title,
                    price,
                    image: imageUrl,
                  });
                  history.push(`detail/${title}`);
                }}
              >
                <div className={css.productName}>{title}</div>
                <div>{price}</div>
              </div>
              <div
                onClick={() => {
                  addToWishlist({
                    image: imageUrl,
                    description,
                    id,
                    title,
                    price,
                  });
                }}
              >
                <img src={LoveWhite} alt="img_wishlist" />
              </div>
            </div>
          </div>
        );
      })
    : null;
};

const RenderCategory = ({ data }) => {
  return data.length > 0
    ? data.map(value => {
        const { imageUrl, name } = value;
        return (
          <div className={css.categoryItem}>
            <div className={css.categoryImage}>
              <img src={imageUrl} className={css.image} alt="image_category" />
            </div>
            <div className={css.categoryTitle}>{name}</div>
          </div>
        );
      })
    : null;
};

const Home = () => {
  const { setDetailProduct, setAllProduct } = useContext(AppContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, data } = state;
  useEffect(() => {
    axios
      .get('https://private-4639ce-ecommerce56.apiary-mock.com/home')
      .then(response => {
        const { data: dataProduct } = response;
        setAllProduct(dataProduct[0].data.productPromo);
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: dataProduct,
        });
      })
      .catch(() => {
        dispatch({ type: 'FETCH_FAILED' });
      });
  }, []);

  return (
    <>
      <RenderHeader />
      {loading ? (
        <div className={css.loading}> Loading</div>
      ) : (
        <>
          <div className={css.categoryWrapper}>
            <RenderCategory data={data[0].data.category} />
          </div>
          <div className={css.productWrapper}>
            <RenderProduct setDetailProduct={setDetailProduct} data={data[0].data.productPromo} />
          </div>
        </>
      )}
    </>
  );
};

export default withMobile(Home);
