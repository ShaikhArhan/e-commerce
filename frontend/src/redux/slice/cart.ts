import { createSlice } from '@reduxjs/toolkit';
import type { apiResponse } from '../../interface/apiResponseInterface';
import type { cartInitialState } from '../../interface/cartInterface';
import {
  addProductToCart,
  deleteCartProduct,
  getCartProduct,
  getSpecificCartProduct,
  updateCartProductQuantity,
} from '../thunk/cart';

const initialState: cartInitialState = {
  data: [],
  specificData: [],
  message: '',
  status: false,
  error: null,
  reducerStatus: 'idle',
};

const cartProduct = createSlice({
  name: 'cartProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = 'fulfilled';
      })
      .addCase(addProductToCart.pending, (state) => {
        state.message = '';
        state.error = null;
        state.reducerStatus = 'pending';
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = 'rejected';
      });

    builder
      .addCase(getCartProduct.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        state.data = payload?.data as Array<object>;
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = 'fulfilled';
      })
      .addCase(getCartProduct.pending, (state) => {
        state.message = '';
        state.error = null;
        state.reducerStatus = 'pending';
      })
      .addCase(getCartProduct.rejected, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = 'rejected';
      });

    builder
      .addCase(getSpecificCartProduct.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        state.data = payload?.data as Array<object>;
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = 'fulfilled';
      })
      .addCase(getSpecificCartProduct.pending, (state) => {
        state.message = '';
        state.error = null;
        state.reducerStatus = 'pending';
      })
      .addCase(getSpecificCartProduct.rejected, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = 'rejected';
      });

    builder
      .addCase(updateCartProductQuantity.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = 'fulfilled';
      })
      .addCase(updateCartProductQuantity.pending, (state) => {
        state.message = '';
        state.error = null;
        state.reducerStatus = 'pending';
      })
      .addCase(updateCartProductQuantity.rejected, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = 'rejected';
      });

    builder
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = 'fulfilled';
      })
      .addCase(deleteCartProduct.pending, (state) => {
        state.message = '';
        state.error = null;
        state.reducerStatus = 'pending';
      })
      .addCase(deleteCartProduct.rejected, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = 'rejected';
      });
  },
});

export default cartProduct;
