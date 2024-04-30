import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice.js";

export default configureStore({
  reducer: {
    user: userSlice,
  },
});
