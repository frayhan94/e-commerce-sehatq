import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';
import './components/base.scss';
import ErrorBoundary from './ErrorBoundary';
import AppContext from './AppContext';
import * as serviceWorker from './serviceWorker';

const App = () => {
  return <ErrorBoundary>{routes}</ErrorBoundary>;
};

const RenderApp = () => {
  const [detailProduct, setDetailProduct] = useState({});
  const [allProduct, setAllProduct] = useState({});
  return (
    <AppContext.Provider
      value={{
        detailProduct,
        allProduct,
        setAllProduct: value => {
          setAllProduct(value);
        },
        setDetailProduct: value => {
          setDetailProduct(value);
        },
      }}
    >
      <App />
    </AppContext.Provider>
  );
};

ReactDOM.render(<RenderApp />, document.getElementById('root') || document.createElement('div'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
