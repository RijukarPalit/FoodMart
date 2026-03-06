import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../Model/types/authTypes';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    restoreUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
    },

    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout, restoreUser } = authSlice.actions;
export default authSlice.reducer;