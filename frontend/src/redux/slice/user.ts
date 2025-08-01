import { createSlice } from "@reduxjs/toolkit";
import type { userInitialState } from "../../interface/userInterface";
import { login } from "../thunk/login";
import type { apiResponse } from "../../interface/apiResponseInterface";
import { decodeToken } from "../thunk/decodeToken";

const initialState: userInitialState = {
  data: {},
  message: "",
  status: false,
  error: null,
  reducerStatus: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(decodeToken.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        state.data = payload?.data as object;
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = "fulfilled";
      })
      .addCase(decodeToken.pending, (state) => {
        state.data = {};
        state.message = "";
        state.error = null;
        state.reducerStatus = "pending";
      })
      .addCase(decodeToken.rejected, (state, action) => {
        const payload = action.payload as apiResponse;
        console.log("payload: ", payload);
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = "rejected";
      });

    builder
      .addCase(login.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        localStorage.setItem("user-auth", String(payload?.data));
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = "fulfilled";
      })
      .addCase(login.pending, (state) => {
        state.data = {};
        state.message = "";
        state.error = null;
        state.reducerStatus = "pending";
      })
      .addCase(login.rejected, (state, action) => {
        const payload = action.payload as apiResponse;
        console.log("payload: ", payload);
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = "rejected";
      });
  },
});

export default userSlice;
