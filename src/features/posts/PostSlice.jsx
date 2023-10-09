import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";
const initialState = {
  posts: [],
  status: "idle",
  error: "null",
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POST_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const response = await axios.post(POST_URL, initialPost);
      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put(`${POST_URL}/${id}`, initialPost);
      return response.data;
    } catch (err) {
      // return err.message;
      return initialState;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialState) => {
    const { id } = initialState;

    try {
      const response = await axios.delete(`${POST_URL}/${id}`);
      if (response?.status === 200) return initialState;
      return `${response?.status}: ${response.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const PostSlices = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts: {
      reducer(state, action) {
        console.log(state.posts);
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body: content,
            date: new Date().toISOString(),
            reactions: { like: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 },
            userId,
          },
        };
      },
    },
    IncrementReaction: (state, action) => {
      const { postId, name } = action.payload;
      const targetPost = state.posts.find((post) => post.id === postId);
      if (targetPost) {
        targetPost.reactions[name]++;
      }
    },
    // deletePost: (state, action) => {
    //   const id = action.payload;
    //   const idx = state.posts.findIndex((post) => post.id === id);
    //   if (idx >= 0) {
    //     state.posts.splice(idx, 1);
    //   }
    //   console.log(idx, id);
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        let min = 1;
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            like: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        state.posts = [...loadedPosts];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          like: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          return;
        }
        action.payload.date = new Date().toISOString();
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== Number(id));
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== Number(id));
        state.posts = posts;
      });
  },
});

export const { addPosts, IncrementReaction } = PostSlices.actions;
export const selectAllPosts = (state) => state.post.posts;
export const selectPostStatus = (state) => state.post.status;
export const selectPostError = (state) => state.post.error;
export const selectPostById = (state, postId) => {
  return state.post.posts.find((post) => Number(post.id) === Number(postId));
};

export const selectPostsByUser = (state, id) =>
  state.post.posts.filter((post) => post.userId === Number(id));

export default PostSlices.reducer;

// {
//   id: 1,
//   title: "new git commands",
//   content: "new git features include commands",
//   author: "Mosh Hamedani",
//   reactions: { like: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 },
//   date: sub(new Date(), { minutes: 10 }).toISOString(),
// },
// {
//   id: 2,
//   title: "visit to university",
//   content: "It was very educational and entertaining",
//   reactions: { like: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 },
//   date: sub(new Date(), { minutes: 5 }).toISOString(),
// },
