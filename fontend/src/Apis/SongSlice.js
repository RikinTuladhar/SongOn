import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const base = "http://localhost:8080";
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
    const URL = baseUrl + `/song/${id}`;
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

const songSlice = createSlice({
  name: "SongSlice",
  initialState,
  reducers: {
    handleSetSongIndex: (state, action) => {
      console.log(action.payload);
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
  },
});

export default songSlice.reducer;
export const { handleSongArray, handleSetSongIndex, handleEmptySongArray } =
  songSlice.actions;
