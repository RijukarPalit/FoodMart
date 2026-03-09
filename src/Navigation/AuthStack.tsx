import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../View/Screens/Auth/SignUpScreen';
import OnBoarding from '../View/Screens/Auth/OnBoarding';
import OnBoardingOne from '../View/Screens/Auth/OnBoardingOne';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name = "OnBoadingOne" component={OnBoardingOne} />
      <Stack.Screen name ="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;