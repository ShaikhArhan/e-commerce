import { createSlice } from '@reduxjs/toolkit';
import type { apiResponse } from '../../interface/apiResponseInterface';
import {
  addOrderProduct,
  deleteOrderProduct,
  getOrderProduct,
} from '../thunk/orderProduct';
import type { OrderProductInitialState } from '../../interface/orderInterface';

const initialState: OrderProductInitialState = {
  data: [],
  message: '',
  status: false,
  error: null,
  reducerStatus: 'idle',
};

const orderProductSlice = createSlice({
  name: 'orderProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrderProduct.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = 'fulfilled';
      })
      .addCase(addOrderProduct.pending, (state) => {
        state.message = '';
        state.error = null;
        state.reducerStatus = 'pending';
      })
      .addCase(addOrderProduct.rejected, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = 'rejected';
      });

    builder
      .addCase(getOrderProduct.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        state.data = payload?.data as Array<object>;
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = 'fulfilled';
      })
      .addCase(getOrderProduct.pending, (state) => {
        state.message = '';
        state.error = null;
        state.reducerStatus = 'pending';
      })
      .addCase(getOrderProduct.rejected, (state, action) => {
        const payload = action.payload as apiResponse;
        state.data = [];
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = 'rejected';
      });

    builder
      .addCase(deleteOrderProduct.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = 'fulfilled';
      })
      .addCase(deleteOrderProduct.pending, (state) => {
        state.message = '';
        state.error = null;
        state.reducerStatus = 'pending';
      })
      .addCase(deleteOrderProduct.rejected, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = 'rejected';
      });
  },
});

export default orderProductSlice;
