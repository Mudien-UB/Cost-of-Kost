import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthSlice";

export default configureStore({
    reducer: {
        Auth: AuthReducer,
    },
});
