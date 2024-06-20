import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  sidebarOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
    sidebarOpenHandler: (state) => {
      state.sidebarOpen = true;
    },
    sidebarCloseHandler: (state) => {
      state.sidebarOpen = false;
    },
  },
});

export const { updateUser, sidebarCloseHandler, sidebarOpenHandler } =
  userSlice.actions;

export default userSlice.reducer;
