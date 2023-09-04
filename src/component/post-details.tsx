import {Text} from '@rneui/base';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {SectionList, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CommentModel, PostModel, UserModel} from '../model';
import {CommentCard} from './comment-card';
import {PostCard} from './post-card';
import {UserCard} from './user-card';

interface PostDetailsProps {
  user: UserModel;
  comments: CommentModel[];
  post: PostModel;
}

type CellType = 'user' | 'comment' | 'post';

interface ListItemModel {
  id: string;
  cell: CellType;
  data: UserModel | CommentModel | PostModel;
}

interface ListItemComponentProps {
  listItem: ListItemModel;
}

interface ListModel {
  title?: string;
  data: ListItemModel[];
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
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  const commentsListModel: ListItemModel[] = comments.map(comment => ({
    id: `comment_${comment.id}`,
    cell: 'comment',
    data: comment,
  }));

  const listModel: ListModel[] = [
    {
      data: [
        {
          id: `post_${post.id}`,
          cell: 'post',
          data: post,
        },
        {
          id: `user_${user.id}`,
          cell: 'user',
          data: user,
        },
      ],
    },
    {
      title: t('post.details.comment.section.title'),
      data: commentsListModel,
    },
  ];

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
