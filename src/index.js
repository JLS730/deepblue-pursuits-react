import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';

import './styling/global.css'

import NavigationBar from './components/NavigationBar';
import Homepage from './pages/Homepage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Account from './pages/Acoount';
import Checkout from './pages/Checkout';
import Shop from './pages/Shop';
import CurrentProduct from './pages/shop-pages/CurrentProduct';
import Footer from './components/Footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    {/* <NavigationBar /> */}
    <Routes>
      <Route path='/home' element={<Homepage />} />
      <Route path='/' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/account' element={<Account />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/shop/product' element={<CurrentProduct />} >
        <Route path=':id' element={<CurrentProduct />} />
      </Route>
      <Route path='/check-out' element={<Checkout />} />
    </Routes>
    <Footer />
    {/* <App /> */}
  </HashRouter>
);

