import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

const Home = loadable(() => import('./container/Home/index'));
const Wishlist = loadable(() => import('./container/Home/Wishlist/index'));
const Profile = loadable(() => import('./container/Profile/index'));
const Cart = loadable(() => import('./container/Cart/index'));
const Feed = loadable(() => import('./container/Feed/index'));
const Search = loadable(() => import('./container/Home/Search/index'));
const ProductDetail = loadable(() => import('./container/Home/Product/Detail/index'));

function NoMatch() {
  return <div>Halaman tidak di temukan</div>;
}

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/feed" component={Feed} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/wishlist" component={Wishlist} />
      <Route exact path="/detail/:name" component={ProductDetail} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
);
