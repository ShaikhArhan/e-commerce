import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../../service/apiCall';
import type { apiResponse } from '../../interface/apiResponseInterface';
import type {
  AddCartProduct,
  DeleteCartProduct,
  GetCartProduct,
  GetSpecificCartProduct,
  UpdateCartProductQuantity,
} from '../../interface/cartInterface';

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async (data: AddCartProduct, { rejectWithValue }) => {
    try {
      const response = (await apiCall(
        '/cart/addProductToCart',
        'POST',
        data
      )) as apiResponse;

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log('addProductToCart --error: ', error);
    }
  }
);

export const getCartProduct = createAsyncThunk(
  'cart/getCartProduct',
  async (data: GetCartProduct, { rejectWithValue }) => {
    try {
      const response = (await apiCall(
        '/cart/getCartProductByUserId',
        'POST',
        data
      )) as apiResponse;

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log('getCartProduct --error: ', error);
    }
  }
);

export const getSpecificCartProduct = createAsyncThunk(
  'cart/getSpecificCartProduct',
  async (data: GetSpecificCartProduct, { rejectWithValue }) => {
    try {
      const response = (await apiCall(
        '/cart/getSpecificCartProductByUserId',
        'POST',
        data
      )) as apiResponse;

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log('getSpecificCartProduct --error: ', error);
    }
  }
);

export const updateCartProductQuantity = createAsyncThunk(
  'cart/updateCartProduct',
  async (data: UpdateCartProductQuantity, { rejectWithValue }) => {
    try {
      const response = (await apiCall(
        '/cart/updateQuantityCartProduct',
        'PATCH',
        data
      )) as apiResponse;

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log('updateQuantityCartProduct --error: ', error);
    }
  }
);

export const deleteCartProduct = createAsyncThunk(
  'cart/deleteCartProduct',
  async (data: DeleteCartProduct, { rejectWithValue }) => {
    try {
      const response = (await apiCall(
        '/cart/deleteCartProduct',
        'DELETE',
        data
      )) as apiResponse;

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log('deleteCartProduct --error: ', error);
    }
  }
);
