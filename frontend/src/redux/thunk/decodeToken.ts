import { createAsyncThunk } from "@reduxjs/toolkit";

import type { apiResponse } from "../../interface/apiResponseInterface";
import { apiCall } from "../../service/apiCall";

export const decodeToken = createAsyncThunk(
  "/auth/decodeToken",
  async (token: string, { rejectWithValue }) => {
    console.log("--decodeToken--");
    try {
      const response = (await apiCall("/token/verifyToken", "POST", {
        token,
      })) as apiResponse;

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log("decodeToken --error: ", error);
    }
  }
);
