import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "../features/posts/PostSlice";
import UserReducer from "../features/users/UsersSlice";

export const store = configureStore({
  reducer: {
    post: PostReducer,
    users: UserReducer,
  },
});
