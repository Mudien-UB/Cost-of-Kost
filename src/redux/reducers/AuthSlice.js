import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
    const user = localStorage.getItem("user");
    const userId = user ? JSON.parse(user).id : null;
    const username = user ? JSON.parse(user).username : null;
    const token = localStorage.getItem("access_token");

    return {
        user: {
            userId,
            username,
        },
        token,
    };
};

export const AuthSlice = createSlice({
    name: "Auth",
    initialState: initialState(),
    reducers: {
        login: (state, action) => {
            state.user = {
                userId: action.payload.userId,
                username: action.payload.username,
            };
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = { userId: null, username: null };
            state.token = null;
        },
    },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
