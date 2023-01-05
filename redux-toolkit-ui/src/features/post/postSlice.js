import { createSlice, creasteAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { posts: [] };

export const getPosts = creasteAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue, dispatch }) => {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    dispatch(setPosts(result.data));
  }
);

export const deletePostById = creasteAsyncThunk(
  "posts/deletePostsById",
  async (id, { rejectWithValue, dispatch }) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    dispatch(deletePost(id));
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    deletePost: (state, action) => {
      state.post = state.post.filter((post) => (post.id = !action.payload));
    },
  },

  extraReducers: {
    [getPosts.fullfilled]: () => console.log("---fullfilled", fullfilled), //прошел успешено запрос
    [getPosts.pending]: () => console.log("---pending", pending), //начинаем запрос
    [getPosts.rejected]: () => console.log("---rejected", rejected), //ошибка

    [deletePostById.fullfilled]: () => console.log("---fullfilled", fullfilled),
    [deletePostById.pending]: () => console.log("---pending", pending),
    [deletePostById.rejected]: () => console.log("---rejected", rejected),
  },
});

export const { setPosts, deletePost } = postSlice.action;
export default postSlice.reducer;
