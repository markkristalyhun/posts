import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button} from '@rneui/base';
import * as React from 'react';
import {Alert, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PostDetails} from '../component';
import {Loader} from '../component/loader';
import {PostStackParamList} from '../navigation';
import {
  useGetCommentsForPostQuery,
  useGetPostsQuery,
  useGetUserQuery,
  useSetFavoriteQuery,
} from '../redux';

interface PostDetailsScreenProps {}

export const PostDetailsScreen: React.FC<PostDetailsScreenProps> = () => {
  const {params} = useRoute<RouteProp<PostStackParamList, 'Details'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<PostStackParamList, 'Details'>>();

  const postQuery = useGetPostsQuery();
  const commentsQuery = useGetCommentsForPostQuery(params.post.id);
  const userQuery = useGetUserQuery(params.post.userId);
  const {setFavorite} = useSetFavoriteQuery();

  const post = React.useMemo(
    () => postQuery?.data?.find(elem => elem.id === params.post.id),
    [params.post.id, postQuery.data],
  );
  console.log(post);

  const toggleFavorite = React.useCallback(() => {
    if (!post) {
      return;
    }
    setFavorite(post.id, !post.favourite);
  }, [setFavorite, post]);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          buttonStyle={styles.favouriteButton}
          icon={<Icon size={20} name={post?.favourite ? 'star' : 'star-o'} />}
          onPress={toggleFavorite}
        />
      ),
    });
  }, [navigation, post, toggleFavorite]);

  if (postQuery.error || commentsQuery.error || userQuery.error) {
    Alert.alert('post.details.error.title', 'post.details.error.description', [
      {
        text: 'close',
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  }

  if (postQuery.isLoading || commentsQuery.isLoading || userQuery.isLoading) {
    return <Loader />;
  }

  return (
    <>
      {commentsQuery.data && userQuery.data && post && (
        <PostDetails
          comments={commentsQuery.data}
          post={post}
          user={userQuery.data}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  favouriteButton: {
    backgroundColor: 'none',
  },
});
