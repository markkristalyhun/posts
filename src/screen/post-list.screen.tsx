import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button} from '@rneui/base';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PostList, PostListContext} from '../component';
import {Loader} from '../component/loader';
import {PostModel} from '../model';
import {PostStackParamList} from '../navigation';
import {useDeletePostMutation, useGetPostsQuery} from '../redux';

interface HeaderProps {
  showFavoriteOnly: boolean;
  onPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({showFavoriteOnly, onPress}) => {
  return (
    <Button
      buttonStyle={styles.headerButton}
      icon={
        <Icon name={showFavoriteOnly ? 'filter' : 'filter-outline'} size={20} />
      }
      onPress={onPress}
    />
  );
};

interface ListPageProps {}

export const PostListScreen: React.FC<ListPageProps> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<PostStackParamList, 'Home'>>();

  const {t} = useTranslation();

  const {data, error, isLoading} = useGetPostsQuery();
  const [deletePost, deleteResult] = useDeletePostMutation();

  const [showFavoriteOnly, setShowFavoriteOnly] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const toggleFavoriteOnly = React.useCallback(() => {
    setRefreshing(true);
    setShowFavoriteOnly(current => !current);
    setRefreshing(false);
  }, [setShowFavoriteOnly]);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Header
          showFavoriteOnly={showFavoriteOnly}
          onPress={() => toggleFavoriteOnly()}
        />
      ),
    });
  }, [navigation, showFavoriteOnly, toggleFavoriteOnly]);

  React.useEffect(() => {
    if (deleteResult.isSuccess || deleteResult.isError) {
      setRefreshing(false);
    }
  }, [deleteResult, setRefreshing]);

  const dataToShow = showFavoriteOnly
    ? data?.filter(post => post.favourite)
    : [...(data ?? [])].sort(post => (post.favourite ? -1 : 1));

  const onListItempressed = (post: PostModel) => {
    navigation.navigate('Details', {post});
  };

  const onListItemDeletePressed = (post: PostModel) => {
    setRefreshing(true);
    deletePost({id: post.id});
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    Alert.alert(
      t('posts.loading.error.title'),
      t('posts.loading.error.description'),
      [
        {
          text: t('close'),
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  }

  if (deleteResult.error) {
    Alert.alert(
      t('posts.loading.delete.title'),
      t('posts.loading.delete.description'),
      [
        {
          text: t('close'),
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
  }

  return (
    <PostListContext.Provider
      value={{
        onPress: onListItempressed,
        onDelete: onListItemDeletePressed,
        refreshing: refreshing,
      }}>
      <PostList posts={dataToShow ?? []} />
    </PostListContext.Provider>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    backgroundColor: 'none',
  },
});
