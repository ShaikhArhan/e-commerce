import { createAsyncThunk } from '@reduxjs/toolkit';
import type { apiResponse } from '../../interface/apiResponseInterface';
import type { AddOrderProductInterface } from '../../interface/orderInterface';
import { apiCall } from '../../service/apiCall';

export const addOrderProduct = createAsyncThunk(
  'order/addOrderProduct',
  async (data: AddOrderProductInterface, { rejectWithValue }) => {
    try {
      // console.log('addOrderProduct --data: ', data);
      const response = (await apiCall(
        '/order/addProductOrder',
        'POST',
        data
      )) as apiResponse;
      // console.log('addOrderProduct --response: ', response);

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log('addOrderProduct --error: ', error);
    }
  }
);

export const getOrderProduct = createAsyncThunk(
  'order/getOrderProduct',
  async (userId: string, { rejectWithValue }) => {
    try {
      // console.log('getOrderProduct --userId: ', userId);
      const response = (await apiCall('/order/getProductOrder', 'POST', {
        userId,
      })) as apiResponse;
      // console.log('getOrderProduct --response: ', response);

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log('getOrderProduct --error: ', error);
    }
  }
);

export const deleteOrderProduct = createAsyncThunk(
  'order/deleteOrderProduct',
  async (orderId: string, { rejectWithValue }) => {
    try {
      // console.log('deleteOrderProduct --orderId: ', orderId);
      const response = (await apiCall('/order/deleteProductOrder', 'DELETE', {
        orderId,
      })) as apiResponse;
      // console.log('deleteOrderProduct --response: ', response);

      if (!response?.status) {
        return rejectWithValue(response);
      }

      return response;
    } catch (error) {
      console.log('deleteOrderProduct --error: ', error);
    }
  }
);
