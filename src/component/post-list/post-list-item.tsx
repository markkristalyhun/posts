import {Button, Icon, ListItem} from '@rneui/base';
import * as React from 'react';
import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {PostModel} from '../../model';
import {PostListContext} from './post-list';

interface PostListItemProps {
  post: PostModel;
}

export const PostListItem: React.FC<PostListItemProps> = ({post}) => {
  const {t} = useTranslation();

  const {onPress, onDelete} = useContext(PostListContext);

  return (
    <ListItem.Swipeable
      containerStyle={{backgroundColor: post.favourite ? '#ffff00' : '#fff'}}
      onPress={() => onPress?.(post)}
      rightContent={() => (
        <Button
          titleStyle={styles.deleteButtonTitle}
          buttonStyle={styles.deleteButton}
          title={t('delete')}
          onPress={() => onDelete?.(post)}
        />
      )}>
      <ListItem.Content>
        <View style={styles.container}>
          <Text style={styles.title}>{post.title}</Text>
          <Icon style={styles.icon} name="chevron-right" size={18} />
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
    width: '100%',
  },
  title: {
    flexShrink: 1,
  },
  icon: {
    flexShrink: 0,
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    minHeight: '100%',
  },
  deleteButtonTitle: {
    fontWeight: '700',
  },
});
