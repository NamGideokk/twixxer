import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feed/feedSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    user: userReducer,
  },
});
