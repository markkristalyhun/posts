import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {CommentModel} from '../model';
import {Card} from './card';

interface CommentCardProps {
  comment: CommentModel;
}

export const CommentCard: React.FC<CommentCardProps> = ({comment}) => {
  return (
    <Card style={styles.container}>
      <Text style={styles.name}>{comment.name}</Text>
      <Text>{comment.body}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
