import { createSlice } from '@reduxjs/toolkit';
import type { productInitialState } from '../../interface/productInterface';
import { getProductById } from '../thunk/product';
import type { apiResponse } from '../../interface/apiResponseInterface';

const initialState: productInitialState = {
  data: [],
  message: '',
  status: false,
  error: null,
  reducerStatus: 'idle',
};

const specificProduct = createSlice({
  name: 'specificProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        state.data = payload?.data;
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = 'fulfilled';
      })
      .addCase(getProductById.pending, (state) => {
        state.data = [];
        state.message = '';
        state.error = null;
        state.reducerStatus = 'pending';
      })
      .addCase(getProductById.rejected, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = 'rejected';
      });
  },
});

export default specificProduct;
