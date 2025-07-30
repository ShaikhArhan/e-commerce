import { createSlice } from '@reduxjs/toolkit';
import type { apiResponse } from '../../interface/apiResponseInterface';
import type { FavoriteProductInitialState } from '../../interface/favoriteProductInterface';
import {
  addFavoriteProduct,
  deleteFavoriteProduct,
  getFavoriteProduct,
} from '../thunk/favoriteProduct';

const initialState: FavoriteProductInitialState = {
  data: [],
  message: '',
  status: false,
  error: null,
  reducerStatus: 'idle',
};

const favoriteProductSlice = createSlice({
  name: 'favoriteProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavoriteProduct.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = 'fulfilled';
      })
      .addCase(addFavoriteProduct.pending, (state) => {
        state.message = '';
        state.error = null;
        state.reducerStatus = 'pending';
      })
      .addCase(addFavoriteProduct.rejected, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = 'rejected';
      });

    builder
      .addCase(getFavoriteProduct.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        state.data = payload?.data as Array<object>;
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = 'fulfilled';
      })
      .addCase(getFavoriteProduct.pending, (state) => {
        state.data = [];
        state.message = '';
        state.error = null;
        state.reducerStatus = 'pending';
      })
      .addCase(getFavoriteProduct.rejected, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = 'rejected';
      });

    builder
      .addCase(deleteFavoriteProduct.fulfilled, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload?.message;
        state.status = payload?.status;
        state.error = null;
        state.reducerStatus = 'fulfilled';
      })
      .addCase(deleteFavoriteProduct.pending, (state) => {
        state.data = [];
        state.message = '';
        state.error = null;
        state.reducerStatus = 'pending';
      })
      .addCase(deleteFavoriteProduct.rejected, (state, action) => {
        const payload = action.payload as apiResponse;
        state.message = payload.message;
        state.status = payload.status;
        state.error = payload.error;
        state.reducerStatus = 'rejected';
      });
  },
});

export default favoriteProductSlice;
