import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "../feaures/Posts/PostSlices";
import { userReducer } from "../feaures/Users/UserSlices";

export const store = configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
  },
});
