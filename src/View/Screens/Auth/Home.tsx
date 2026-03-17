import {
  ImageBackground, StyleSheet, Text, View,
  TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native'
import React, { useMemo, useState } from 'react'
import { ColorName, useColor } from '../../../model/color';
import { ImageName } from '../../../adapter/asserts/images';
import { FontFamily } from '../../../adapter/asserts/fonts';
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from '../../../utils/dimention';
import { WWTextInput } from '../../Components/WWTextInput';
import { WWButton } from '../../Components/WWButton';
import { FontSize } from '../../../adapter/constants';
import { useAppDispatch } from '../../../Redux/hooks';
import { login } from '../../../Redux/authSlice';

const Home = () => {
  const navigation = useNavigation();
  const color = useColor();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const styles = useMemo(() => createStyles(color), [color]);

  const handleLogin = () => {
    let valid = true;

    // Validate
    if (!email.trim()) { setEmailError('Email is required'); valid = false; }
    else setEmailError(null);

    if (!password.trim()) { setPasswordError('Password is required'); valid = false; }
    else setPasswordError(null);

    if (!valid) return;

    //  Dispatch login — RootNavigator watches isAuthenticated
    // and automatically switches to AppStack (Home)
    dispatch(login({
      id: '1',
      email: email,
      name: email,
      // add other User fields as per your User type
    }));
  };

  return (
    <ImageBackground
      source={ImageName.AuthBg}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
      
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Home;

const createStyles = (color: any) =>
  StyleSheet.create({
    background: { flex: 1 },
    scrollContent: {
      flexGrow: 1,
      alignItems: 'center',
      paddingBottom: hp(4),
    },
    topSection: {
      alignItems: 'center',
      paddingTop: hp(10),
      paddingBottom: hp(4),
    },
    logo: {
      width: wp(25),
      height: hp(10),
      marginBottom: hp(1.5),
    },
    tagline: {
      fontSize: FontSize.Size.small_5x,
      fontFamily: FontFamily.MANROPE.BOLD,
      color: color[ColorName.white],
      letterSpacing: 0.3,
    },
    card: {
      width: wp(88),
      backgroundColor: color[ColorName.white],
      borderRadius: 24,
      paddingHorizontal: wp(6),
      paddingTop: hp(3.5),
      paddingBottom: hp(3),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 6,
      marginTop: hp(4),
      marginBottom: hp(2),
    },
    cardTitle: {
      fontSize: hp(2.8),
      fontFamily: FontFamily.MANROPE.BOLD,
      color: '#1C1C1C',
      textAlign: 'center',
      marginBottom: hp(2.5),
    },
    inputContainer: {
      marginVertical: hp(0.6),
    },
    button: {
      marginTop: hp(2.5),
      backgroundColor: color[ColorName.primary], // ✅ use primary color
      borderRadius: 12,
      minHeight: hp(6.5),
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonLabel: {
      fontSize: FontSize.Size.small_4x,
      fontFamily: FontFamily.MANROPE.BOLD,
      color: color[ColorName.white],
      letterSpacing: 0.5,
    },
    footer: {
      alignItems: 'center',
      marginTop: hp(3),
    },
    footerText: {
      fontSize: FontSize.Size.small_3x,
      fontFamily: FontFamily.MANROPE.MEDIUM,
      color: color[ColorName.black],
    },
    loginLink: {
      fontSize: FontSize.Size.small_3x,
      fontFamily: FontFamily.MANROPE.BOLD,
      color: '#E91E8C',
      marginTop: hp(0.5),
    },
  });