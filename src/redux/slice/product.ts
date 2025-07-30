import { createSlice } from '@reduxjs/toolkit';
import type { productInitialState } from '../../interface/productInterface';
import { getProduct } from '../thunk/product';
import type { apiResponse } from '../../interface/apiResponseInterface';

const initialState: productInitialState = {
  data: [],
  message: '',
  status: false,
  error: null,
  reducerStatus: 'idle',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        state.data = payload?.data;
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = 'fulfilled';
      })
      .addCase(getProduct.pending, (state) => {
        state.data = [];
        state.message = '';
        state.error = null;
        state.reducerStatus = 'pending';
      })
      .addCase(getProduct.rejected, (state, action) => {
        const payload = action.payload as apiResponse;        
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = 'rejected';
      });
  },
});

export default productSlice;
