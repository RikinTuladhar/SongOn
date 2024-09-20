import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BaseURL from "../BaseUrl";
import axios from "axios";
// const base = "https://songon.onrender.com";
const base = BaseURL;
const initialState = {
  songs: [],
  status: "pending",
  error: "",
  allSongs: [],
  songById: {},
  songIndex: 0,
};
console.log(initialState.songs);
console.log(initialState.songIndex);
export const getAllSongs = createAsyncThunk(
  "getSongs",
  async function getSong() {
    const URL = base + "/song";
    // console.log(URL);
    try {
      const response = await axios.get(URL);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (e) {
      console.error(error);
    }
  }
);

export const getSongById = createAsyncThunk(
  "getSongById",
  async function getSongById(id) {
    const URL = base + `/song/${id}`;
    console.log(URL);
    try {
      const response = await axios.get(URL);
      const data = await response.data;
      console.log(data);
      return data;
    } catch (e) {
      console.error(error);
    }
  }
);

export const getSongLikesByIds = async (user_id, song_id) => {
  const URL =
    base + `/user-song-interactions?user_id=${user_id}&song_id=${song_id}`;
  try {
    const response = await axios.get(URL);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserLikedSongByName = async (user_id) => {

  const URL = base + `/user-song-interactions/user-liked-song?user_id=${user_id}`;
  console.log(URL);
  try {
    const response = await axios.get(URL);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const songLike = async (value) => {
  const URL = base + "/user-song-interactions";
  console.log(URL);
  console.log(value);
  try {
    const response = await axios.post(URL, value);
    const data = await response.data;
    console.log("Post Request" + data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllUserSongInteractions = async () => {
  const URL = base + "/user-song-interactions/all";
  try {
    const res = await axios.get(URL);
    const data = await res.data;
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const songSlice = createSlice({
  name: "SongSlice",
  initialState,
  reducers: {
    handleSetSongIndex: (state, action) => {
      //   console.log(action.payload);
      state.songIndex = action.payload;
    },
    handleSongArray: (state, action) => {
      //comming from
      //library.jsx
      state.songs = action.payload;
    },
    handleEmptySongArray: (state) => {
      state.songs = [];
    },
  },
  extraReducers: (builder) => {
    builder
      //get songs
      .addCase(getAllSongs.pending, (state) => {
        state.status = "pending";
        state.error = null;
        state.allSongs = [];
      })
      .addCase(getAllSongs.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = "";
        state.allSongs = action.payload;
      })
      .addCase(getAllSongs.rejected, (state) => {
        state.status = "rejected";
        state.error = true;
        state.allSongs = action.payload;
      })

      //get by song id
      .addCase(getSongById.pending, (state) => {
        state.status = "pending";
        state.error = null;
        state.songs = {};
      })
      .addCase(getSongById.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.error = "";
        state.songs = action.payload;
      })
      .addCase(getSongById.rejected, (state) => {
        state.status = "rejected";
        state.error = true;
        state.songs = action.payload;
      });
    // .addCase(songLike.pending, (state) => {})
    // .addCase(songLike.fulfilled, (state) => {})
    // .addCase(songLike.rejected, (state) => {});
  },
});

export default songSlice.reducer;
export const { handleSongArray, handleSetSongIndex, handleEmptySongArray } =
  songSlice.actions;
