import {BASE_URL} from '@env';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {CommentModel} from '../model';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: builder => ({
    getCommentsForPost: builder.query<CommentModel[], number>({
      query: id => `/posts/${id}/comments`,
    }),
  }),
});

export const {useGetCommentsForPostQuery} = commentApi;
