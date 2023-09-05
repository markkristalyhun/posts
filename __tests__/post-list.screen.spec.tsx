import React from 'react';
import {render} from 'react-native-testing-library';
import {Alert} from 'react-native';
import {PostListScreen} from '../src/screen/post-list.screen';
import {useGetPostsQuery} from '../src/redux';
import {useDeletePostMutation} from '../__mock__/redux';

// eslint-disable-next-line react-hooks/rules-of-hooks
const mockUseDeletePostMutation = () => useDeletePostMutation();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    setOptions: jest.fn(),
  }),
}));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    bottom: 0,
  }),
}));
jest.mock('../src/redux', () => ({
  useGetPostsQuery: jest.fn(),
  useDeletePostMutation: () => mockUseDeletePostMutation(),
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: jest.fn(() => '')}),
}));

describe('PostListScreen Component', () => {
  it('renders loader when isLoading is true', () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({isLoading: true});
    const {getByTestId} = render(<PostListScreen />);
    expect(getByTestId('loader')).toBeDefined();
  });

  it('renders error alert when error is present', () => {
    (useGetPostsQuery as jest.Mock).mockReturnValue({error: true});
    Alert.alert = jest.fn();
    render(<PostListScreen />);
    expect(Alert.alert).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(Array),
    );
  });
});
