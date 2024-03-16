//npm install redux react-redux
//npm install @reduxjs/toolkit

import { configureStore, createReducer } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer
  }
});

