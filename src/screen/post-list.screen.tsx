import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button} from '@rneui/base';
import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PostList, PostListContext} from '../component';
import {Loader} from '../component/loader';
import {PostModel} from '../model';
import {PostStackParamList} from '../navigation';
import {useDeletePostMutation, useGetPostsQuery} from '../redux';

interface HeaderProps {
  showFavoriteOnly: boolean;
  onFavoritePress?: () => void;
  onRefreshPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  showFavoriteOnly,
  onFavoritePress,
  onRefreshPress,
}) => {
  return (
    <View style={styles.headerContainer}>
      <Button
        buttonStyle={styles.headerButton}
        icon={<Icon name={'refresh'} size={20} />}
        onPress={onRefreshPress}
      />
      <Button
        buttonStyle={styles.headerButton}
        icon={
          <Icon
            name={showFavoriteOnly ? 'filter' : 'filter-outline'}
            size={20}
          />
        }
        onPress={onFavoritePress}
      />
    </View>
  );
};

interface ListPageProps {}

export const PostListScreen: React.FC<ListPageProps> = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<PostStackParamList, 'Home'>>();

  const {t} = useTranslation();

  const {data, error, isLoading, refetch, isFetching} = useGetPostsQuery();
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
          onFavoritePress={() => toggleFavoriteOnly()}
          onRefreshPress={() => refetch()}
        />
      ),
    });
  }, [navigation, showFavoriteOnly, toggleFavoriteOnly, refetch]);

  React.useEffect(() => {
    if (deleteResult.isSuccess || deleteResult.isError) {
      setRefreshing(false);
    }
  }, [deleteResult, setRefreshing]);

  const dataToShow = React.useMemo(
    () =>
      showFavoriteOnly
        ? data?.filter(post => post.favourite)
        : [...(data ?? [])].sort(post => (post.favourite ? -1 : 1)),
    [data, showFavoriteOnly],
  );

  const onListItemPressed = (post: PostModel) => {
    navigation.navigate('Details', {post});
  };

  const onListItemDeletePressed = (post: PostModel) => {
    setRefreshing(true);
    deletePost({id: post.id});
  };

  if (isLoading || isFetching) {
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
        onPress: onListItemPressed,
        onDelete: onListItemDeletePressed,
        refreshing: refreshing,
      }}>
      <PostList posts={dataToShow ?? []} />
    </PostListContext.Provider>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  headerButton: {
    backgroundColor: 'none',
  },
});
