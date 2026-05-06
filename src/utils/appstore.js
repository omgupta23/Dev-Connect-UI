import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userslice";
import feedReducer from "./feedslice";
import connectionReducer from "./connectionslice";

export const appstore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
  },
});
