import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";

export const appstore = configureStore({
  reducer: {
    user: userReducer,
  },
});
