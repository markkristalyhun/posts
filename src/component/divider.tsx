import * as React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

interface DividerProps extends ViewProps {}

export const Divider: React.FC<DividerProps> = ({style, ...props}) => {
  return <View style={[styles.divider, style]} {...props} />;
};

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
