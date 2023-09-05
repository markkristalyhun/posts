import React from 'react';
import {render, waitFor} from 'react-native-testing-library';
import {
  useGetCommentsForPostQuery,
  useGetPostsQuery,
  useGetUserQuery,
} from '../src/redux';
import {PostDetailsScreen} from '../src/screen/post-details.screen';

// Mock navigation and query hooks
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(() => ({
    params: {post: {id: 1, userId: 1}},
  })),
  useNavigation: jest.fn(() => ({
    setOptions: jest.fn(),
  })),
}));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    bottom: 0,
  }),
}));
jest.mock('../src/redux', () => ({
  useGetPostsQuery: jest.fn(() => ({
    isLoading: true,
    data: [{id: 1, title: 'Post Title', favourite: false}],
  })),
  useGetCommentsForPostQuery: jest.fn(() => ({})),
  useGetUserQuery: jest.fn(() => ({})),
  useSetFavoriteQuery: jest.fn(() => ({
    setFavorite: jest.fn(),
  })),
}));

describe('PostDetailsScreen Component', () => {
  it('renders loader when loading data', () => {
    const {getByTestId} = render(<PostDetailsScreen />);
    expect(getByTestId('loader')).toBeDefined();
  });

  it('renders PostDetails when data is available', async () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [{id: 1, title: 'Post Title', favourite: false}],
    });
    (useGetCommentsForPostQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [{id: 1, body: 'Comment Body'}],
    });
    (useGetUserQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {id: 1, name: 'User Name'},
    });

    const {getByText} = render(<PostDetailsScreen />);
    await waitFor(() => {
      expect(getByText('Post Title')).toBeDefined();
      expect(getByText('Comment Body')).toBeDefined();
      expect(getByText('User Name')).toBeDefined();
    });
  });
});
