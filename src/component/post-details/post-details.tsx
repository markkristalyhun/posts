import * as React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CommentModel, PostModel, UserModel} from '../../model';
import {CommentCard} from './comment-card';
import {PostCard} from './post-card';
import {postDetailListAdapter} from './post-detail-list-adapter';
import {PostDetailsListItemModel} from './post-details.types';
import {UserCard} from './user-card';

interface PostDetailsProps {
  user: UserModel;
  comments: CommentModel[];
  post: PostModel;
}

interface ListItemComponentProps {
  listItem: PostDetailsListItemModel;
}

const ListItemComponent: React.FC<ListItemComponentProps> = ({listItem}) => {
  if (listItem.cell === 'post') {
    return <PostCard post={listItem.data as PostModel} />;
  } else if (listItem.cell === 'user') {
    return <UserCard user={listItem.data as UserModel} />;
  } else {
    return <CommentCard comment={listItem.data as CommentModel} />;
  }
};

export const PostDetails: React.FC<PostDetailsProps> = ({
  post,
  user,
  comments,
}) => {
  const insets = useSafeAreaInsets();

  const listModel = React.useMemo(() => {
    return postDetailListAdapter(post, user, comments);
  }, [comments, post, user]);

  return (
    <SectionList
      contentContainerStyle={[
        {
          paddingBottom: insets.bottom,
        },
        styles.listContainer,
      ]}
      sections={listModel}
      keyExtractor={item => item.id}
      renderItem={({item}) => <ListItemComponent listItem={item} />}
      ItemSeparatorComponent={() => <Separator />}
      renderSectionHeader={({section: {title}}) =>
        title ? <Text style={styles.sectionTitle}>{title}</Text> : null
      }
      stickySectionHeadersEnabled={false}
    />
  );
};

const Separator: React.FC = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  separator: {
    height: 10,
  },
});
