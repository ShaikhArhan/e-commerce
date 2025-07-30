import { createAsyncThunk } from '@reduxjs/toolkit';

import type { apiResponse } from '../../interface/apiResponseInterface';
import { apiCall } from '../../service/apiCall';

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (_, { rejectWithValue }) => {
    try {
      const response = (await apiCall(
        '/product/getProduct',
        'GET'
      )) as apiResponse;

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log('getProduct --error: ', error);
    }
  }
);

export const getProductById = createAsyncThunk(
  'product/getProductById',
  async (productId: string, { rejectWithValue }) => {  
    try {
      const response = (await apiCall(
        `/product/getProductById/${productId}`,
        'POST'
      )) as apiResponse;

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log('getProductById --error: ', error);
    }
  }
);
