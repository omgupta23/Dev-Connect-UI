import { createSlice } from "@reduxjs/toolkit";

const feedslice = createSlice({
  name: "feed",

  initialState: [],

  reducers: {
    addfeed: (state, action) => {
      return action.payload;
    },

    removefeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addfeed, removefeed } = feedslice.actions;

export default feedslice.reducer;
