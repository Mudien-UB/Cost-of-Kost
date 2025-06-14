import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: null,
    username: null,
  },
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { userId, username } = action.payload;
      state.user = { userId, username };
    },
    logout: (state) => {
      state.user = { userId: null, username: null };
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
