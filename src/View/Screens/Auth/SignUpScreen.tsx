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
import { useAppDispatch } from '../../../Redux/hooks';  // ✅ add
import { login } from '../../../Redux/authSlice';        // ✅ add

const SignUpScreen = () => {
  const navigation = useNavigation();
  const color = useColor();
  const dispatch = useAppDispatch(); // ✅ add

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null); // ✅ add

  const styles = useMemo(() => createStyles(color), [color]);

  const handleCreateAccount = () => {
    let valid = true;

    if (!name.trim()) { setNameError('Name is required'); valid = false; }
    else setNameError(null);

    if (!email.trim()) { setEmailError('Email is required'); valid = false; }
    else setEmailError(null);

    if (!password.trim()) { setPasswordError('Password is required'); valid = false; }
    else setPasswordError(null);

    // ✅ confirm password validation
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Please confirm your password'); valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match'); valid = false;
    } else setConfirmPasswordError(null);

    if (!valid) return;

    // ✅ dispatch login — RootNavigator auto-switches to AppStack (Home)
    dispatch(login({
      id: '1',
      name: name,
      email: email,
      // add other fields as per your User type
    }));

    // ✅ NO navigation.navigate('Home') needed
  };

  return (
    <ImageBackground
      source={ImageName.AuthBg}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1, paddingBottom : 45 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Top Section ── */}
          <View style={styles.topSection}>
            <ImageBackground
              source={ImageName.FoodieLogo}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.tagline}>Deliver Favourite Food</Text>
          </View>

          {/* ── White Card ── */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Sign Up</Text>

            {/* Name */}
            <WWTextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              error={nameError}
              inputBgColor="#F2F2F2"
              inputTextColor="#333"
              borderRadius={12}
              leftIconSource={ImageName.UserIcon}
              leftIconSize={18}
              leftIconTint="#888"
              placeholderColor="#AAAAAA"
              containerStyle={styles.inputContainer}
            />

            {/* Email */}
            <WWTextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              inputBgColor="#F2F2F2"
              inputTextColor="#333"
              borderRadius={12}
              leftIconSource={ImageName.EmailIcon}
              leftIconSize={18}
              leftIconTint="#888"
              placeholderColor="#AAAAAA"
              containerStyle={styles.inputContainer}
            />

            {/* Password */}
            <WWTextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              error={passwordError}
              isPassword
              inputBgColor="#F2F2F2"
              inputTextColor="#333"
              borderRadius={12}
              leftIconSource={ImageName.LockIcon}
              leftIconSize={18}
              leftIconTint="#888"
              placeholderColor="#AAAAAA"
              containerStyle={styles.inputContainer}
              eyeOpenIcon={ImageName.EyeOpen}
              eyeClosedIcon={ImageName.EyeClosed}
            />

            {/* Confirm Password */}
            <WWTextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              error={confirmPasswordError} // ✅ fixed — own error state
              isPassword
              inputBgColor="#F2F2F2"
              inputTextColor="#333"
              borderRadius={12}
              leftIconSource={ImageName.LockIcon}
              leftIconSize={18}
              leftIconTint="#888"
              placeholderColor="#AAAAAA"
              containerStyle={styles.inputContainer}
              eyeOpenIcon={ImageName.EyeOpen}
              eyeClosedIcon={ImageName.EyeClosed}
            />

            <WWButton
              label="Create Account"
              type="primary"
              size="medium"
              style={styles.button}
              labelStyle={styles.buttonLabel}
              onPress={handleCreateAccount}
            />
          </View>

          {/* ── Footer ── */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Login' as never)}
            >
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default SignUpScreen;

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
      paddingTop: hp(8),
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
      backgroundColor: color[ColorName.primary],
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
      color: color[ColorName.black], // ✅ fixed casing
    },
    loginLink: {
      fontSize: FontSize.Size.small_3x,
      fontFamily: FontFamily.MANROPE.BOLD,
      color: '#E91E8C',
      marginTop: hp(0.5),
    },
  });