import * as React from 'react';
import {Linking, StyleSheet, Text} from 'react-native';
import {UserModel} from '../../model';
import {Card} from '../card';

interface UserCardProps {
  user: UserModel;
}

export const UserCard: React.FC<UserCardProps> = ({user}) => {
  const onEmailPress = () => {
    const url = `mailto:${user.email}`;
    Linking.canOpenURL(url).then(() => Linking.openURL(url));
  };

  const onTelPress = () => {
    const url = `tel:${user.phone}`;
    Linking.canOpenURL(url).then(() => Linking.openURL(url));
  };

  return (
    <Card style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.link} onPress={onEmailPress}>
        {user.email}
      </Text>
      <Text style={styles.link} onPress={onTelPress}>
        {user.phone}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: '#0000ff',
    textDecorationLine: 'underline',
  },
});
