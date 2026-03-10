import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { ImageName } from '../../../adapter/asserts/images'
import { hp, wp } from '../../../utils/dimention' // Added wp for horizontal spacing
import { FontFamily } from '../../../adapter/asserts/fonts'
import { FontSize } from '../../../adapter/constants'
import { BlankSpace } from '../../Components/BlankSpace'
import { WWButton } from '../../Components/WWButton'
import { ColorName, useColor } from '../../../model/color'
import { useAppDispatch } from '../../../Redux/hooks'
import { setOnboardingSeen } from '../../../Redux/authSlice'
import { Storage } from '../../../Services/storage'

const OnBoarding = () => {
     const color = useColor();
     const dispatch = useAppDispatch();

     const handleGetStarted = async() => {
        //  dispatch(setOnboardingSeen());
        await Storage.setOnboardingSeen();
        dispatch(setOnboardingSeen());
     }

  const styles = useMemo(() => createStyles(color), [color])

  return (
    <ImageBackground source={ImageName.OnBoardingImg} style={styles.background} resizeMode="cover">
      <View style={styles.footerContainer}>
        <View style={styles.textSection}>
          <Text style={styles.heading}>
            Foodie is Where Your{"\n"}
            <Text style={{ color: color[ColorName.primary] || '#C67C4E' }}>Comfort Food</Text> Resides
          </Text>

          <BlankSpace height={hp(1.5)} />

          <Text style={styles.subHeading}>
            Enjoy a fast and smooth food delivery{"\n"}right at your doorstep.
          </Text>
        </View>

        <BlankSpace height={hp(4)} />

        <WWButton
          type="secondary"
          label="Get Started"
          style={styles.button}
          size="medium"
          onPress={handleGetStarted}
        />
      </View>
    </ImageBackground>
  )
}

 export default OnBoarding

const createStyles = (color: any) =>
  StyleSheet.create({
    background: { flex: 1 },
    footerContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: hp(8),
      paddingHorizontal: wp(10),
    },
    textSection: { alignItems: 'center' },
    heading: {
      fontSize: FontSize.Size.small_5x,
      textAlign: 'center',
      fontFamily: FontFamily.MANROPE.BOLD,
      color: color[ColorName.darkGray] || '#1C1C1C',
      lineHeight: hp(4),
    },
    subHeading: {
      fontSize: FontSize.Size.small_3x,
      textAlign: 'center',
      fontFamily: FontFamily.MANROPE.REGULAR,
      color: color[ColorName.darkGray],
      lineHeight: hp(2.5),
      opacity: 0.8,
    },
    button: {
      minHeight: hp(6.5),
      width: '100%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: color[ColorName.primary] || '#C67C4E',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
  })