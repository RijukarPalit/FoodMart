import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../Model/types/authTypes';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  hasSeenOnboarding: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    restoreUser: (state, action: PayloadAction<{ user: User | null; hasSeenOnboarding: boolean }>) => {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.user;
      state.hasSeenOnboarding = action.payload.hasSeenOnboarding; // ✅ restore from storage
      state.isLoading = false;
    },

    setOnboardingSeen: (state) => {
      state.hasSeenOnboarding = true; // ✅ Redux update (storage saved in component)
    },

    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.hasSeenOnboarding = true; // ✅ logged in users always skip onboarding
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // ✅ hasSeenOnboarding stays true — don't show onboarding again after logout
    },
  },
});

export const { login, logout, restoreUser, setOnboardingSeen } = authSlice.actions;
export default authSlice.reducer;