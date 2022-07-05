import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: null,
  email: null,
  photoURL: null,
  uid: null,
  isLoggedIn: false,
  isLoading: false,
};

// export const getUser = createAsyncThunk(
//   "user/getUser",
//   async (name, thunkAPI) => {
//     try {
//       const user = await useAuth();
//       console.log("청크에서 유저", user);
//       console.log("불러오는거 맞아?");
//       return user;
//     } catch (error) {
//       return thunkAPI.rejectWithValue("유저 정보를 가져오지 못했습니다.");
//     }
//   }
// );

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      const payload = action.payload;

      state.displayName = payload.displayName;
      state.email = payload.email;
      state.photoURL = payload.photoURL;
      state.uid = payload.uid;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    setLogoutUser: (state) => {
      state.displayName = null;
      state.email = null;
      state.photoURL = null;
      state.uid = null;
      state.isLoggedIn = false;
      state.isLoading = false;
    },
  },
  // extraReducers: {
  //   [getUser.pending]: (state) => {
  //     state.isLoading = true;
  //     state.isLoggedIn = false;
  //   },
  //   [getUser.fulfilled]: (state, action) => {
  //     console.log("getUser : fulfilled", action);
  //     state.isLoading = false;
  //     state.isLoggedIn = true;
  //     state.displayName = action.payload;
  //     state.email = action.payload;
  //     state.photoURL = action.payload;
  //     state.uid = action.payload;
  //   },
  //   [getUser.rejected]: (state, action) => {
  //     console.log("getUser : rejected", action);
  //     state.isLoading = false;
  //     state.isLoggedIn = false;
  //   },
  // },
});

export const { setActiveUser, setLogoutUser } = userSlice.actions;

export default userSlice.reducer;
