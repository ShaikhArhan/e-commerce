import { useEffect, useState } from 'react';
import type { apiResponse } from '../interface/apiResponseInterface';
import axios from 'axios';
import apiBaseUrl from '../util/baseApi';

export const useApi = (
  url: string,
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
  data?: object | undefined,
  params?: string | undefined
) => {
  const [response, setResponse] = useState<apiResponse>();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        if (
          !url ||
          url === undefined ||
          url === '' ||
          !method ||
          method === undefined
        ) {
          throw new Error('url or method is undefine or empty in apihook');
        }
        const isAuthRequired: boolean = !['/login', '/register'].some((data) =>
          url.includes(data)
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

        if (!result.data) {
          throw new Error('empty api response');
        }

        const responseData = result.data as apiResponse;

        setResponse(responseData);
      } catch (error) {
        setResponse({
          message: `API failed --url:${url}`,
          status: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    };

    fetchApi();
  }, [url, method, data, params]);

  return response;
};
