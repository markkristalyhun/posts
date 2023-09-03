import * as React from 'react';
import {FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PostModel} from '../../model';
import {Divider} from '../divider';
import {PostListItem} from './post-list-item';

type PostListContextType = {
  onPress?: (post: PostModel) => void;
  onDelete?: (post: PostModel) => void;
  refreshing?: boolean;
};

export const PostListContext = React.createContext<PostListContextType>({});

interface PostListProps {
  posts: PostModel[];
}

export const PostList: React.FC<PostListProps> = ({posts}) => {
  const insets = useSafeAreaInsets();
  const {refreshing} = React.useContext(PostListContext);

  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: insets.bottom,
      }}
      refreshing={refreshing}
      data={posts}
      keyExtractor={post => `${post.id}`}
      renderItem={({item}) => (
        <>
          <PostListItem post={item} />
          <Divider />
        </>
      )}
    />
  );
};
