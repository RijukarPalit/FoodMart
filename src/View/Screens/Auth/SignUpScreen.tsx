import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { ColorName, useColor } from '../../../model/color';
import { ImageName } from '../../../adapter/asserts/images';
import { WWHeader } from '../../Components/WWHeader';
import { FontFamily } from '../../../adapter/asserts/fonts';
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from '../../../utils/dimention';
import { WWTextInput } from '../../Components/WWTextInput';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const color = useColor();
  const styles = useMemo(() => createStyles(color), [color])
  return (
    <ImageBackground
      source={ImageName.AuthBg}
      style={styles.background}
      resizeMode='cover'
    >
      <View>
        <WWHeader
          title="Sign Up"
          showBackButton = {false}
          onBackPress={() => navigation.goBack()}
          containerStyle={{
            marginTop: hp(2.5),
          }}
          titleStyle={{
            color: ColorName.primary || '#C67C4E',
            fontSize: hp(2.5),
            fontFamily: FontFamily.MANROPE.BOLD,
          }}
        />

        <WWTextInput
          label="Full Name"
          placeholder="Enter your full name"
          required
        />


      </View>
    </ImageBackground>
  )
}

export default SignUpScreen

const createStyles = (color: any) =>
  StyleSheet.create({
    background: {
      flex: 1,
    },
  })