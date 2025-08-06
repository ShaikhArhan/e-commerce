import { createSlice } from "@reduxjs/toolkit";
import type { ratingInitialState } from "../../interface/ratingInterface";
import type { apiResponse } from "../../interface/apiResponseInterface";
import { getProductRating } from "../thunk/rating";

const initialState: ratingInitialState = {
  data: [],
  message: "",
  status: false,
  error: null,
  reducerStatus: "idle",
};

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductRating.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        state.data = payload?.data as Array<object>;
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = "fulfilled";
      })
      .addCase(getProductRating.pending, (state) => {
        state.data = [];
        state.message = "";
        state.error = null;
        state.reducerStatus = "pending";
      })
      .addCase(getProductRating.rejected, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = "rejected";
      });
  },
});

export default ratingSlice;
