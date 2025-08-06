import { createAsyncThunk } from "@reduxjs/toolkit";

import type { apiResponse } from "../../interface/apiResponseInterface";
import { apiCall } from "../../service/apiCall";
import type {
  AddFavoriteProductInterface,
  DeleteFavoriteProductInterface,
  GetFavoriteProduct,
} from "../../interface/favoriteProductInterface";

export const addFavoriteProduct = createAsyncThunk(
  "product/addFavoriteProduct",
  async (data: AddFavoriteProductInterface, { rejectWithValue }) => {
    try {
      // console.log('addFavoriteProduct --data: ', data);
      const response = (await apiCall(
        "/favoriteProduct/addFavoriteProduct",
        "POST",
        data
      )) as apiResponse;
      // console.log('addFavoriteProduct --response: ', response);

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log("addFavoriteProduct --error: ", error);
    }
  }
);

export const getFavoriteProduct = createAsyncThunk(
  "product/getFavoriteProduct",
  async (data: GetFavoriteProduct, { rejectWithValue }) => {
    try {
      // console.log('getFavoriteProduct --userId: ', userId);

      const response = (await apiCall(
        "/favoriteProduct/getFavoriteProduct",
        "POST",
        data
      )) as apiResponse;
      // console.log('getFavoriteProduct --response: ', response);

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log("getFavoriteProduct --error: ", error);
    }
  }
);

export const deleteFavoriteProduct = createAsyncThunk(
  "product/deleteFavoriteProduct",
  async (data: DeleteFavoriteProductInterface, { rejectWithValue }) => {
    try {
      // console.log('addFavoriteProduct --data: ', data);

      const response = (await apiCall(
        "/favoriteProduct/deleteFavoriteProductByIds",
        "DELETE",
        data
      )) as apiResponse;
      // console.log('deleteFavoriteProduct --response: ', response);

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log("deleteFavoriteProduct --error: ", error);
    }
  }
);
