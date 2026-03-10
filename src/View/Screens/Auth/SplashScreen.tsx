import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { Storage } from '../../../Services/storage';
import { useAppDispatch } from '../../../Redux/hooks';
import { restoreUser } from '../../../Redux/authSlice';
import { ImageName } from '../../../adapter/asserts/images';

const SplashScreen = () => {
  const dispatch = useAppDispatch();

useEffect(() => {
  let timer: ReturnType<typeof setTimeout>;

  const checkUser = async () => {
    const [user, hasSeenOnboarding] = await Promise.all([
      Storage.getUser(),
      Storage.getOnboardingSeen(),
    ]);

    timer = setTimeout(() => { 
      dispatch(restoreUser({ user, hasSeenOnboarding }));
    }, 3000);
  };

  checkUser();

  return () => clearTimeout(timer);
}, []);

  return (
    <ImageBackground
      source={ImageName.Splash}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      resizeMode='cover'
    />
  );
};

export default SplashScreen;