// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const register = createAsyncThunk(
//   '/auth/login',
//   async (data: userRegister, { rejectWithValue }) => {
//     console.log('data: ', data);
//     try {
//       const response = (await apiCall(
//         '/auth/login',
//         'POST',
//         data
//       )) as apiResponse;

//       if (!response?.status) {
//         return rejectWithValue(response);
//       }

//       return response;
//     } catch (error) {
//       console.log('login --error: ', error);
//     }
//   }
// );


// fullname, email, password, country, phoneNumber, address, role