import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: null,
  },
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username } = action.payload;
      state.user = { username };
    },
    logout: (state) => {
      state.user = { userId: null, username: null };
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
