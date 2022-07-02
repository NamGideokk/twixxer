import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useFirebase from "customHook/useFirebase";

const initialState = {
  feeds: [],
  isLoading: false,
};

export const getFeeds = createAsyncThunk(
  "feed/getFeeds",
  async (name, thunkAPI) => {
    try {
      const resp = await useFirebase();
      return resp;
    } catch (error) {
      return thunkAPI.rejectWithValue("게시물을 가져오지 못했습니다.");
    }
  }
);

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: {
    [getFeeds.pending]: (state) => {
      state.isLoading = true;
    },
    [getFeeds.fulfilled]: (state, action) => {
      console.log(state, action);
      state.isLoading = false;
    },
    [getFeeds.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  },
});

export default feedSlice.reducer;
