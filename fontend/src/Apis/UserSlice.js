import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const base = "https://songonbackend.onrender.com";
const initialState = {
  userDetails: {},
  status: "idle",
  error: null,
  role: "",
};

export const getUser = createAsyncThunk(
  "getUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const endpoint = `${base}/getUser/${token}`;
      const res = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const logOut = createAsyncThunk("logout", async () => {
  localStorage.removeItem("token");
  // You can return a value here if needed, but it's not necessary
  return;
});

export const signIn = createAsyncThunk("signin", async (value) => {
  const endpoint = `${base}/login`;
  try {
    const response = await axios.post(endpoint, value);
    const data = response.data.token;
    // console.log(data);
    localStorage.setItem("token", data);
    const role = await axios.get(`${base}/getUser/${data}`, {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });
    // console.log(role.data);

    return role.data;
  } catch (error) {
    throw new Error("Error when login: " + error);
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
