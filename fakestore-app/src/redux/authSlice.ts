import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from '../types/UserProfile';

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;