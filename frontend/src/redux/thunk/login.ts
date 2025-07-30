import { createAsyncThunk } from '@reduxjs/toolkit';

import type { apiResponse } from '../../interface/apiResponseInterface';
import { apiCall } from '../../service/apiCall';
import type { userLogin } from '../../interface/loginInterface';

export const login = createAsyncThunk(
  '/auth/login',
  async (data: userLogin, { rejectWithValue }) => {
    console.log('data: ', data);
    try {
      const response = (await apiCall(
        '/auth/login',
        'POST',
        data
      )) as apiResponse;

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log('login --error: ', error);
    }
  }
);
