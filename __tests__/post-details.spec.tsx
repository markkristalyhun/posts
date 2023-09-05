import React from 'react';
import {render} from 'react-native-testing-library';
import {PostDetails} from '../src/component/post-details/post-details';
import {
  CommentModel,
  PostModel,
  UserAddressModel,
  UserCompanyModel,
  UserModel,
} from '../src/model';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    bottom: 0,
  }),
}));

export const mockUserCompany: UserCompanyModel = {
  name: 'Example Company',
  catchPhrase: 'Catchy phrase',
  bs: 'BS',
};

export const mockUserAddress: UserAddressModel = {
  street: '123 Main St',
  suite: 'Apt 45',
  city: 'Cityville',
  zipcode: '12345',
  geo: {
    lat: 40.7128,
    lng: -74.006,
  },
};

export const mockUser: UserModel = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'johndoe@example.com',
  address: mockUserAddress,
  phone: '123-456-7890',
  website: 'example.com',
  company: mockUserCompany,
};

const mockComments: CommentModel[] = [
  {
    id: 1,
    postId: 1,
    name: 'Comment 1',
    body: 'Body 1',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    postId: 2,
    name: 'Comment 2',
    body: 'Body 2',
    email: 'johndoe2@example.com',
  },
];
const mockPost: PostModel = {
  id: 1,
  userId: 1,
  title: 'Post Title',
  body: 'Post Body',
};

describe('PostDetails Component', () => {
  it('renders without errors', () => {
    const {getByText} = render(
      <PostDetails user={mockUser} comments={mockComments} post={mockPost} />,
    );

    expect(getByText(mockPost.title)).toBeDefined();
    expect(getByText(mockPost.body)).toBeDefined();
    expect(getByText(mockUser.name)).toBeDefined();
    expect(getByText(mockUser.email)).toBeDefined();
    expect(getByText(mockUser.phone)).toBeDefined();

    expect(getByText(mockComments[0].name)).toBeDefined();
    expect(getByText(mockComments[0].body)).toBeDefined();
    expect(getByText(mockComments[1].name)).toBeDefined();
    expect(getByText(mockComments[1].body)).toBeDefined();
  });
});
