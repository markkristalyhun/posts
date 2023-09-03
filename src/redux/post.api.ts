import {BASE_URL} from '@env';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {PostModel} from '../model';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  endpoints: builder => ({
    getPosts: builder.query<PostModel[], void>({
      query: () => '/posts',
    }),
    deletePost: builder.mutation<PostModel, Pick<PostModel, 'id'>>({
      query: ({id}) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted({id}, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          postApi.util.updateQueryData('getPosts', undefined, draft => {
            const index = draft.findIndex(post => post.id === id);
            if (index >= 0) {
              draft.splice(index, 1);
            }
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {useGetPostsQuery, useDeletePostMutation} = postApi;

export const setFavorite = (id: number, isFavorite: boolean) =>
  postApi.util.updateQueryData('getPosts', undefined, draft => {
    const index = draft.findIndex(post => post.id === id);
    if (index >= 0) {
      draft.splice(index, 1, {...draft[index], favourite: isFavorite});
    }
    return draft;
  });
