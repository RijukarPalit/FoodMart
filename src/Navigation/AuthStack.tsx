import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../View/Screens/Auth/SignUpScreen';
import OnBoarding from '../View/Screens/Auth/OnBoarding';
import OnBoardingOne from '../View/Screens/Auth/OnBoardingOne';
import { useAppSelector } from '../Redux/hooks';
import Login from '../View/Screens/Auth/Login';
import Home from '../View/Screens/Auth/Home';
import ForgotPassword from '../View/Screens/Auth/ForgotPassword';

const Stack = createNativeStackNavigator();

// AuthStack.tsx
const AuthStack = () => {
  const { hasSeenOnboarding } = useAppSelector(state => state.auth); 

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasSeenOnboarding ? (<>
        <Stack.Screen name="OnBoardingOne" component={OnBoardingOne} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
      </>
      ) : (
        <>
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;