import {ActivityIndicator, StyleSheet, View} from 'react-native';
import * as React from 'react';

export const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    justifyContent: 'center',
  },
});
