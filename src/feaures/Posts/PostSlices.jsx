import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: 1,
    title: "new git commands",
    content: "new git features include commands",
    reactions: { thumbsup: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 },
    date: sub(new Date(), { minutes: 10 }).toISOString(),
  },
  {
    id: 2,
    title: "visit to university",
    content: "It was very educational and entertaining",
    reactions: { thumbsup: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 },
    date: sub(new Date(), { minutes: 5 }).toISOString(),
  },
];

const PostSlices = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },
    deletePost: (state, action) => {
      // const targetIdx = state.findIndex(
      //   (post) => post.id === Number(action.payload)
      // );
      // state.splice(targetIdx, 1, 0);

      // const newState = state.filter(
      //   (post) => post.id === Number(action.payload)
      // );
      // state = [...newState];
      state.pop();
      console.log(action.payload);
    },
    addReaction: (state, action) => {
      const { name, postId } = action.payload;
      const targetPost = state.find((post) => post.id === Number(postId));
      if (targetPost) {
        targetPost.reactions[name]++;
      }
    },
  },
});

export const selectAllPosts = (state) => state.posts;
export const postReducer = PostSlices.reducer;
export const { addPost, deletePost, addReaction } = PostSlices.actions;
