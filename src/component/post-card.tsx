import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {PostModel} from '../model';
import {Card} from './card';

interface PostCardProps {
  post: PostModel;
}

export const PostCard: React.FC<PostCardProps> = ({post}) => {
  return (
    <Card style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text>{post.body}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
