import axios from 'axios';
import type { apiResponse } from '../interface/apiResponseInterface';
import apiBaseUrl from '../util/baseApi';

export const apiCall = async (
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  data?: object | string | undefined,
  params?: string | undefined
) => {
  try {
    if (
      !url ||
      url === undefined ||
      url === '' ||
      !method ||
      method === undefined
    ) {
      throw new Error('url or method is undefine or empty in apiCall');
    }

    const isAuthRequired: boolean = !['/auth/login', '/auth/register'].some(
      (data) => url.includes(data)
    );

    const token = localStorage.getItem('user-auth');

    const axiosConfig = {
      url: `${apiBaseUrl}${url}`,
      method,
      data,
      params,
      headers: isAuthRequired
        ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        : {},
    };

    const result = await axios(axiosConfig);
    console.log('result: ', result);

    if (!result) {
      throw new Error('empty response');
    }

    const response = result.data as apiResponse;

    return response;
  } catch (error) {
    return {
      message: `Api failed --url:${url}`,
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
