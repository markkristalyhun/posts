import {BASE_URL} from '@env';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {UserModel} from '../model';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: builder => ({
    getUser: builder.query<UserModel, number>({
      query: id => `/users/${id}`,
    }),
  }),
});

export const {useGetUserQuery} = userApi;
