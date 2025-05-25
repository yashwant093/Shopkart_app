

// authApi.ts
import { createApi, fetchBaseQuery, BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/apiConstants';
import { RootState } from '../modules/auth/store/store';
import { VerificationOtpResponse,  GenerateOTPRequest,
  GenerateOTPResponse,
  ResetRequest,
  ResetResponse,
  TokenRequest,
  TokenResponse,
  UserCreateRequest,
  UserCreateResponse,
  UserLoginRequest,
  UserLoginResponse,
  VerificationOtpRequest, } from '../modules/auth/store/api';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // TODO: Add logout or refresh logic here if needed
    // api.dispatch(logout());
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getToken: builder.mutation<TokenResponse, TokenRequest>({
      query: (credentials) => ({
        url: 'Auth/GenerateToken',
        method: 'POST',
        body: credentials,
      }),
    }),

    generateOTP: builder.mutation<GenerateOTPResponse, GenerateOTPRequest>({
      query: ({ mobileNo, password }) => ({
        url: 'Login/GenerateOTP',
        method: 'POST',
        body: { mobileNo, password },
      }),
    }),

    verifyOTP: builder.mutation<VerificationOtpResponse, VerificationOtpRequest>({
      query: ({ verificationCode, mobileNo, passWord }) => ({
        url: 'Login/VerifyOTP',
        method: 'POST',
        body: { verificationCode, mobileNo, passWord },
      }),
    }),

    userCreate: builder.mutation<UserCreateResponse, UserCreateRequest>({
      query: ({ userName, userMobileNo, Password }) => ({
        url: 'Login/UserCreate',
        method: 'POST',
        body: { userName, userMobileNo, Password },
      }),
    }),

    login: builder.mutation<UserLoginResponse, UserLoginRequest>({
      query: ({ mobileNo, passWord }) => ({
        url: 'Login/ValidateUser',
        method: 'POST',
        body: { mobileNo, passWord },
      }),
    }),

    resetPassword: builder.mutation<ResetResponse, ResetRequest>({
      query: ({ mobileNo, newPassword, confirmPassword }) => ({
        url: 'Login/ValidateUser',
        method: 'POST',
        body: { mobileNo, newPassword, confirmPassword },
      }),
    }),
  }),
});

export const {
  useGetTokenMutation,
  useGenerateOTPMutation,
  useVerifyOTPMutation,
  useUserCreateMutation,
  useLoginMutation,
  useResetPasswordMutation,
} = api;
