import { createAsyncThunk } from "@reduxjs/toolkit";
import type { apiResponse } from "../../interface/apiResponseInterface";
import { apiCall } from "../../service/apiCall";

export const getProductRating = createAsyncThunk(
  "product/getProductRating",
  async (_, { rejectWithValue }) => {
    try {
      const response = (await apiCall(
        "/rating/getRating",
        "GET"
      )) as apiResponse;

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log("getProductRating --error: ", error);
    }
  }
);
