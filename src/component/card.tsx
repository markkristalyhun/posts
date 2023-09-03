import * as React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

type CardProps = ViewProps;

export const Card: React.FC<CardProps> = ({style, ...props}) => {
  return <View style={[styles.card, style]} {...props} />;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
