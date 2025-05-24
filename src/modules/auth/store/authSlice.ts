import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
  },
});

export const { setTokens, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
