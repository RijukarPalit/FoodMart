import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '../Redux/hooks';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import SplashScreen from '../View/Screens/Auth/SplashScreen';

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;