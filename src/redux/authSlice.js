import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  
  initialState: {
    isAuthenticated: false,
    username: null,
    role:null,
    sessionKey: null
  },

  reducers: {
    login: (state, action) => {
      console.log('login reducer is called');
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.sessionKey = action.payload.sessionKey;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.username = null;
      state.sessionKey = null;
      console.log('logout reducer is called');
    }
  }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
