import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {PostModel} from '../model';
import {PostDetailsScreen, PostListScreen} from '../screen';

export type PostStackParamList = {
  Home: undefined;
  Details: {post: PostModel};
};

const Stack = createNativeStackNavigator<PostStackParamList>();

export const Navigation: React.FC = () => {
  const {t} = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={t('posts')} component={PostListScreen} />
        <Stack.Screen name={t('details')} component={PostDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
