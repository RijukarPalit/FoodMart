import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../View/Screens/Auth/SplashScreen';
import SignUpScreen from '../View/Screens/Auth/SignUpScreen';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from '../View/Screens/Auth/SplashScreen';
// import SignUpScreen from '../View/Screens/Auth/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;