import React, { useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { Storage } from '../../../Services/storage';
import { useAppDispatch } from '../../../Redux/hooks';
import { restoreUser } from '../../../Redux/authSlice';
import { ImageName } from '../../../adapter/asserts/images';

const SplashScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkUser = async () => {
      const user = await Storage.getUser();

      setTimeout(() => {
        dispatch(restoreUser(user));
      }, 3000);
    };

    checkUser();
  }, []);

  return (
    // <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    //   <Text>FoodMart</Text>
    // </View>

    <ImageBackground
      source={ImageName.Splash}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      resizeMode='cover'
    >

    </ImageBackground>
  );
};

export default SplashScreen;