import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayName: null, // displayName
  email: null, // email
  photoURL: null, // photoURL
  uid: null, // uid
  isLoggedIn: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.photoURL = action.payload.photoURL;
      state.uid = action.payload.uid;
    },
    setLogoutUser: (state) => {
      state.displayName = null;
      state.email = null;
      state.photoURL = null;
      state.uid = null;
    },
  },
});

export const { setActiveUser, setLogoutUser } = userSlice.actions;

export default userSlice.reducer;
