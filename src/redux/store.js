import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice.js";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};
const persist = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    user: persist,
  },
});

export const persistor = persistStore(store);
