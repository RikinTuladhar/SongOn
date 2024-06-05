import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Apis/UserSlice";

const store = configureStore({
  reducer: UserSlice,
});

export default store;
