import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import Products from './components/Products';
import NotFound from './components/NotFound';
import Login from './components/Login';
import ProtectedRoute from './ProtectedRoute';
import UserRegistration from './components/Registration';
import Cart from './Pages/Cart';
import Order from './Pages/Order';
import ManageProducts from './components/ManageProducts';
import ManageUsers from './components/ManageUsers';
import MyAccount from './components/MyAccount';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<UserRegistration />} />

          <Route path="/login" element={<Login />} />
          <Route path="/products" element={
            <Products />
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          } />
          <Route path="/manage_products" element={
            <ProtectedRoute>
              <ManageProducts />
            </ProtectedRoute>
          } />
          <Route path="/manage_users" element={
            <ProtectedRoute>
              <ManageUsers />
            </ProtectedRoute>
          } />
          <Route path="/my_account" element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
