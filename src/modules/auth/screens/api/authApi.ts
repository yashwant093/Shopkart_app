// // src/modules/auth/api/authApi.ts

// import { baseApi } from "../../../../services/baseApi";

// export const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: '/auth/login',
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     signup: builder.mutation({
//       query: (userData) => ({
//         url: '/auth/signup',
//         method: 'POST',
//         body: userData,
//       }),
//     }),
//     logout: builder.mutation({
//       query: () => ({
//         url: '/auth/logout',
//         method: 'POST',
//       }),
//     }),
//     refreshToken: builder.query({
//       query: () => '/auth/refresh-token',
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useSignupMutation,
//   useLogoutMutation,
//   useRefreshTokenQuery,
// } = authApi;
