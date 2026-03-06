import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { useAppSelector } from '../Redux/hooks';
import AppStack from './AppStack';

const RootNavigator = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;