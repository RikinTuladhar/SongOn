import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BaseURL from "../BaseUrl";
// const base = "https://songon.onrender.com";
const base = BaseURL;
const initialState = {
  userDetails: {
    id: "",
    firstName: "",
    lastname: "",
    role: "",
    username: "",
  },
  status: "idle",
  error: null,
  role: "",
};

export const getUser = createAsyncThunk(
  "getUser",
  async (_, { rejectWithValue }) => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("user"));
      const userName = userDetails.username;
      const endpoint = `${base}/getUser/${userName}`;
      const res = await axios.get(endpoint);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const logOut = createAsyncThunk("logout", async () => {
  localStorage.removeItem("user");
  return;
});

export const signIn = createAsyncThunk("signin", async (value) => {
  const endpoint = `${base}/login`;
  try {
    const response = await axios.post(endpoint, value);
    const data = await response.data;
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response.data.errorMessage);
    throw new Error(error.response.data.errorMessage);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userDetails = action.payload;
        state.status = "completed";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "completed";
        state.error = null;
        state.userDetails = action.payload;
        state.role = action.payload.role;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.userDetails = {};
        state.status = "idle";
        state.error = null;
        state.role = "";
      });
  },
});

export default userSlice.reducer;
