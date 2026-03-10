import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { ImageName } from '../../../adapter/asserts/images'
import { hp, wp } from '../../../utils/dimention' // Added wp for horizontal padding
import { FontFamily } from '../../../adapter/asserts/fonts'
import { FontSize } from '../../../adapter/constants'
import { BlankSpace } from '../../Components/BlankSpace'
import { WWButton } from '../../Components/WWButton'
import { ColorName, useColor } from '../../../model/color'
import { useNavigation } from '@react-navigation/native'
import { Storage } from '../../../Services/storage'
import { useAppDispatch } from '../../../Redux/hooks'

const OnBoardingOne = () => {
    const color = useColor();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('OnBoarding' as never);
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    const handleNext = () => {
        return () => {
            navigation.navigate('OnBoarding' as never);
        };
    };

    return (
        <ImageBackground
            source={ImageName.OnboardingImg1}
            style={styles.background}
            resizeMode='cover'
        >
            <View style={styles.contentContainer}>
                <View style={styles.textWrapper}>
                    <Text style={styles.heading}>
                        Track your {"\n"}
                        <Text style={styles.highlightText}>Comfort Food</Text> here
                    </Text>
                    <View style={styles.accentBar} />
                    <Text style={styles.subHeading}>
                        Find a chef or dish for every taste{"\n"}and preference. Enjoy the journey!
                    </Text>
                </View>

                <BlankSpace height={hp(4)} />

                <WWButton
                    type="secondary"
                    label='Next'
                    style={[styles.button, { backgroundColor: color[ColorName.primary] }]}
                    size="medium"
                    onPress={handleNext()}
                />
            </View>
        </ImageBackground>
    )
}

export default OnBoardingOne

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: hp(8),
        paddingHorizontal: wp(10),
    },
    textWrapper: {
        alignItems: 'flex-start',
    },
    heading: {
        fontSize: FontSize.Size.small_5x,
        lineHeight: hp(4.5),
        fontFamily: FontFamily.MANROPE.BOLD,
        color: '#1C1C1C',
        opacity: 0.9,
    },
    highlightText: {
        color: '#C67C4E', // Using your brand brown/orange for emphasis
    },
    accentBar: {
        width: wp(15),
        height: 4,
        backgroundColor: '#C67C4E',
        marginVertical: hp(1.5),
        borderRadius: 2,
    },
    subHeading: {
        fontSize: FontSize.Size.small_3x,
        fontFamily: FontFamily.MANROPE.MEDIUM,
        color: '#555555',
        lineHeight: hp(2.5),
        opacity: 0.8,
    },
    button: {
        minHeight: hp(6.5),
        width: '100%', // Full width inside the padded container
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
})