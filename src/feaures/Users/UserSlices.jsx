import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, name: "Mosh Traversy" },
  { id: 2, name: "Brad Hamedani" },
  { id: 3, name: "Dave Gray" },
];

const userSlices = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const userReducer = userSlices.reducer;
export const selectAllUser = (state) => state.users;
