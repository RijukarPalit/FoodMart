import {
    ImageBackground, StyleSheet, Text, View,
    TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform,
    ActivityIndicator,
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

const ForgotPassword = () => {
    const navigation = useNavigation();
    const color = useColor();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);

    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const [loading, setLoading] = useState(false);

    const styles = useMemo(() => createStyles(color), [color]);

    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // ✅ Send OTP
    const handleSendOtp = async () => {
        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        }

        if (!isValidEmail(email)) {
            setEmailError('Invalid email format');
            return;
        }

        setEmailError(null);
        setLoading(true);

        try {
            // API CALL HERE
            // await sendOtpAPI({ email });

            setOtpSent(true);
        } catch (error) {
            console.log('OTP Error:', error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Verify OTP
    const handleVerifyOtp = async () => {
        if (!otp.trim()) return;

        setLoading(true);

        try {
            //  API CALL HERE
            // await verifyOtpAPI({ email, otp });

            navigation.navigate('Login' as never);
        } catch (error) {
            console.log('Verify Error:', error);
        } finally {
            setLoading(false);
        }
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
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >

                    {/* Top Section */}
                    <View style={styles.topSection}>
                        <ImageBackground
                            source={ImageName.FoodieLogo}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.tagline}>Deliver Favourite Food</Text>
                    </View>

                    {/* Card */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Forgot Password</Text>

                        {/* Email Input */}
                        <WWTextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                setEmailError(null); //  clear error on typing
                            }}
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

                        {/* STEP 1: SEND OTP */}
                        {!otpSent ? (
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    (!isValidEmail(email) || loading) && styles.disableButton,
                                ]}
                                onPress={handleSendOtp}
                                disabled={!isValidEmail(email) || loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="white" />
                                ) : (
                                    <Text style={styles.buttonText}>
                                        Send Verification Code
                                    </Text>
                                )}
                            </TouchableOpacity>
                        ) : (
                            <>
                                {/* OTP Input */}
                                <WWTextInput
                                    placeholder="Enter verification code"
                                    value={otp}
                                    onChangeText={setOtp}
                                    keyboardType="number-pad"
                                    maxLength={6}
                                    containerStyle={styles.inputContainer}
                                />

                                {/* VERIFY BUTTON */}
                                <TouchableOpacity
                                    style={[
                                        styles.button,
                                        (!otp || loading) && styles.disableButton,
                                    ]}
                                    onPress={handleVerifyOtp}
                                    disabled={!otp || loading}
                                >
                                    {loading ? (
                                        <ActivityIndicator size="small" color="white" />
                                    ) : (
                                        <Text style={styles.buttonText}>
                                            Verify & Continue
                                        </Text>
                                    )}
                                </TouchableOpacity>

                                {/* RESEND */}
                                <TouchableOpacity
                                    onPress={handleSendOtp}
                                    style={styles.resendContainer}
                                    disabled={loading}
                                >
                                    <Text style={styles.resendText}>
                                        Didn’t receive code?{' '}
                                        <Text style={styles.resendLink}>Resend</Text>
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Signup' as never)}
                        >
                            <Text style={styles.loginLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

export default ForgotPassword;

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
        forgotPassword: {
            fontSize: FontSize.Size.small_3x,
            fontFamily: FontFamily.MANROPE.BOLD,
            color: '#E91E8C',
            marginTop: hp(0.5),
        },

        buttonText: {
            fontSize: FontSize.Size.small_4x,
            fontFamily: FontFamily.MANROPE.BOLD,
            color: color[ColorName.white],
            letterSpacing: 0.5,
        },
        resendContainer: {
            marginTop: hp(2),
            alignItems: 'center',
        },
        resendText: {
            fontSize: FontSize.Size.small_3x,
            fontFamily: FontFamily.MANROPE.MEDIUM,
            color: color[ColorName.black],
        },
        resendLink: {
            fontSize: FontSize.Size.small_3x,
            fontFamily: FontFamily.MANROPE.BOLD,
            color: '#E91E8C',
        },
        disableButton: {
            backgroundColor: '#B0B0B0',
            elevation: 0,
        },
    });