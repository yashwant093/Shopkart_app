// src/modules/auth/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  user: any | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string, user: any }>) {
      state.accessToken = action.payload.token;
      state.user = action.payload.user;
    },
    updateToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    logout(state) {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, updateToken, logout } = authSlice.actions;
export default authSlice.reducer;
