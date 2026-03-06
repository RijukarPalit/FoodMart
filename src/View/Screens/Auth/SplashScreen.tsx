import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Storage } from '../../../Services/storage';
import { useAppDispatch } from '../../../Redux/hooks';
import { restoreUser } from '../../../Redux/authSlice';

const SplashScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkUser = async () => {
      const user = await Storage.getUser();
      dispatch(restoreUser(user));
    };

    checkUser();
  }, []);

  return (
    <View>
      <Text>FoodMart</Text>
    </View>
  );
};

export default SplashScreen;