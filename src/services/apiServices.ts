// import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { BASE_URL } from '../constants/apiConstants';
// // import { logout } from '../modules/auth/store/authSlice';

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE_URL,
//   prepareHeaders: (headers, { getState, endpoint }) => {
//     const token = (getState() as any).auth.accessToken;
//     const publicEndpoints = ['generateOtp', 'login'];

//     if (!publicEndpoints.includes(endpoint) && token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }

//     return headers;
//   },
// });

// const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
//   const result = await baseQuery(args, api, extraOptions);
//   if (result?.error?.status === 401) {
//     // api.dispatch(logout());
//   }
//   return result;
// };

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: baseQueryWithReauth,
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: 'Auth/GenerateToken',
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     generateOtp: builder.mutation({
//       query: (credentials) => ({
//         url: 'Login/GenerateOTP',
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//   }),
// });

// export const { useLoginMutation, useGenerateOtpMutation } = api;

// services/apiServices.ts



import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/apiConstants';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = (getState() as any)?.auth?.accessToken;
    const publicEndpoints = ['login'];

    if (!publicEndpoints.includes(endpoint) && token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // TODO: Implement logout or refresh logic if required
    // api.dispatch(logout());
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'Auth/GenerateToken',
        method: 'POST',
        body: credentials,
      }),
    }),
    generateOtp: builder.mutation({
      query: (credentials) => ({
        url: 'Login/GenerateOTP',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useGenerateOtpMutation } = api;
