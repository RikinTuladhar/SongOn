import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Apis/UserSlice";
import SongSlice from "../Apis/SongSlice"
const store = configureStore({
  reducer: {
    user: UserSlice,
    song: SongSlice
  }
});

export default store;
