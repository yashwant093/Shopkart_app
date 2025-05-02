// services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { logout } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://api.escuelajs.co/api/v1/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // api.dispatch(logout());
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<{ access_token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query<any, void>({
      query: () => 'auth/profile',
    }),
  }),
});

export const { useLoginMutation, useGetProfileQuery } = api;
