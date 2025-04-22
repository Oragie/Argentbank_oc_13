import { configureStore } from "@reduxjs/toolkit";
import logReducer from "./logSlice";
import userReducer from "./userSlice";
import accountReducer from "./accountSlice";

export const store = configureStore({
  reducer: {
    login: logReducer,
    user: userReducer,
    accounts: accountReducer,
  },
});

export default store;
