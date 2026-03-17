import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  StyleProp,
  ViewStyle,
  TextInputProps as RNTextInputProps,
  Animated,
  Easing,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  TextStyle,
  Text,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from "react-native";
import { ColorName, ColorObject, useColor } from "../../model/color";
import { FontFamily } from "../../adapter/asserts/fonts";
import { FontSize } from "../../adapter/constants";
import { hp, wp } from "../../utils/dimention";

// ─── Types ────────────────────────────────────────────────────────────────────

export type WWTextInputProps = RNTextInputProps & {

  // ── Label ──────────────────────────────────────────────────────────────────
  /** Label text above the input */
  label?: string;
  /** Show required asterisk (*) */
  required?: boolean;
  /** Custom label style */
  labelStyle?: StyleProp<TextStyle>;
  /** Label font size. Default: FontSize.Size.small_4x */
  labelFontSize?: number;
  /** Label font family. Default: FontFamily.MANROPE.SEMI_BOLD */
  labelFontFamily?: string;
  /** Label color */
  labelColor?: string;

  // ── Input ──────────────────────────────────────────────────────────────────
  /** Input font size. Default: FontSize.Size.small_3x */
  inputFontSize?: number;
  /** Input font family. Default: FontFamily.MANROPE.MEDIUM */
  inputFontFamily?: string;
  /** Input text color. Default: '#333333' */
  inputTextColor?: string;
  /** Placeholder text color */
  placeholderColor?: string;
  /** Custom style for the TextInput itself */
  inputStyle?: StyleProp<TextStyle>;

  // ── Container ──────────────────────────────────────────────────────────────
  /** Custom style for the outer wrapper */
  style?: StyleProp<ViewStyle>;
  /** Custom style for the input row container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Background color of input box. Default: '#F2F2F2' */
  inputBgColor?: string;
  /** Border radius. Default: 16 */
  borderRadius?: number;
  /** Minimum height of input box. Default: hp(6.5) */
  inputHeight?: number;
  /** Horizontal padding inside input. Default: wp(4) */
  inputPaddingHorizontal?: number;

  // ── Focus & Error Border ───────────────────────────────────────────────────
  /** Border color when focused. Default: primary brand color */
  focusBorderColor?: string;
  /** Border color when idle. Default: 'transparent' */
  idleBorderColor?: string;
  /** Error message shown below input */
  error?: string | null;
  /** Error text color */
  errorColor?: string;
  /** Error font size */
  errorFontSize?: number;

  // ── Left Icon ──────────────────────────────────────────────────────────────
  /** Image source for left icon */
  leftIconSource?: ImageSourcePropType;
  /** Size of left icon. Default: 20 */
  leftIconSize?: number;
  /** Tint color for left icon */
  leftIconTint?: string;
  /** Custom style for left icon image */
  leftIconStyle?: StyleProp<ImageStyle>;
  /** Fully custom left node (overrides leftIconSource) */
  leftIcon?: React.ReactNode;

  // ── Right Icon ─────────────────────────────────────────────────────────────
  /** Image source for right icon */
  rightIconSource?: ImageSourcePropType;
  /** Size of right icon. Default: 20 */
  rightIconSize?: number;
  /** Tint color for right icon */
  rightIconTint?: string;
  /** Custom style for right icon image */
  rightIconStyle?: StyleProp<ImageStyle>;
  /** Called when right icon is pressed */
  onRightIconPress?: () => void;
  /** Fully custom right node (overrides rightIconSource) */
  rightIcon?: React.ReactNode;

  // ── Password ───────────────────────────────────────────────────────────────
  /** Enables password mode (hides text + shows eye toggle) */
  isPassword?: boolean;
  /** Image for 'show password' eye icon */
  eyeOpenIcon?: ImageSourcePropType;
  /** Image for 'hide password' eye icon */
  eyeClosedIcon?: ImageSourcePropType;
  /** Size of eye icon. Default: 20 */
  eyeIconSize?: number;
};

// ─── Component ────────────────────────────────────────────────────────────────

export const WWTextInput: React.FC<WWTextInputProps> = ({
  // Label
  label,
  required,
  labelStyle,
  labelFontSize,
  labelFontFamily = FontFamily.MANROPE.SEMI_BOLD,
  labelColor,

  // Input
  value = "",
  inputFontSize,
  inputFontFamily = FontFamily.MANROPE.MEDIUM,
  inputTextColor = "#333333",
  placeholderColor,
  inputStyle,

  // Container
  style,
  containerStyle,
  inputBgColor,
  borderRadius = 16,
  inputHeight,
  inputPaddingHorizontal,

  // Focus & Error
  focusBorderColor,
  idleBorderColor = "transparent",
  error,
  errorColor,
  errorFontSize,

  // Left Icon
  leftIconSource,
  leftIconSize = 20,
  leftIconTint,
  leftIconStyle,
  leftIcon,

  // Right Icon
  rightIconSource,
  rightIconSize = 20,
  rightIconTint,
  rightIconStyle,
  onRightIconPress,
  rightIcon,

  // Password
  isPassword = false,
  eyeOpenIcon,
  eyeClosedIcon,
  eyeIconSize = 20,

  // RN props
  onChangeText,
  placeholder,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(isPassword);
  const borderAnim = useRef(new Animated.Value(0)).current;
  const color = useColor();

  // Resolved defaults using color system
  const resolvedBg = inputBgColor ?? '#F2F2F2';
  const resolvedFocusBorder = focusBorderColor ?? color[ColorName.primary] ?? '#C67C4E';
  const resolvedLabelColor = labelColor ?? color[ColorName.textSecondary] ?? '#7C7C7C';
  const resolvedPlaceholderColor = placeholderColor ?? color[ColorName.textDisabled] ?? '#AAAAAA';
  const resolvedErrorColor = errorColor ?? color[ColorName.error] ?? '#E90000';
  const resolvedIconTint = leftIconTint ?? color[ColorName.textSecondary] ?? '#7C7C7C';

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: error ? 2 : isFocused ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isFocused, error]);

  const animatedBorderColor = borderAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [idleBorderColor, resolvedFocusBorder, resolvedErrorColor],
  });

  const animatedBorderWidth = borderAnim.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1.5, 1.5],
  });

  // ── Render left icon ──
  const renderLeftIcon = () => {
    if (leftIcon) return <View style={styles.leftIconWrapper}>{leftIcon}</View>;
    if (leftIconSource) return (
      <View style={styles.leftIconWrapper}>
        <Image
          source={leftIconSource}
          style={[
            {
              width: leftIconSize,
              height: leftIconSize,
              resizeMode: 'contain',
              tintColor: resolvedIconTint,
            },
            leftIconStyle,
          ]}
        />
      </View>
    );
    return null;
  };

  // ── Render right icon ──
  const renderRightIcon = () => {
    // Password eye toggle
    if (isPassword) {
      return (
        <TouchableOpacity
          onPress={() => setIsSecure(prev => !prev)}
          activeOpacity={0.7}
          style={styles.rightIconWrapper}
        >
          {isSecure
            ? eyeClosedIcon
              ? 
              <Image source={eyeClosedIcon} style={{ width: eyeIconSize, height: eyeIconSize, resizeMode: 'contain', tintColor: resolvedIconTint }} />
              : <DefaultEyeClosedIcon size={eyeIconSize} color={resolvedIconTint} />
            : eyeOpenIcon
              ? <Image source={eyeOpenIcon} style={{ width: eyeIconSize, height: eyeIconSize, resizeMode: 'contain', tintColor: resolvedIconTint }} />
              : <DefaultEyeOpenIcon size={eyeIconSize} color={resolvedIconTint} />
          }
        </TouchableOpacity>
      );
    }

    // Custom right node
    if (rightIcon) return (
      <TouchableOpacity
        onPress={onRightIconPress}
        activeOpacity={onRightIconPress ? 0.7 : 1}
        style={styles.rightIconWrapper}
        disabled={!onRightIconPress}
      >
        {rightIcon}
      </TouchableOpacity>
    );

    // Right icon from source
    if (rightIconSource) return (
      <TouchableOpacity
        onPress={onRightIconPress}
        activeOpacity={onRightIconPress ? 0.7 : 1}
        style={styles.rightIconWrapper}
        disabled={!onRightIconPress}
      >
        <Image
          source={rightIconSource}
          style={[
            {
              width: rightIconSize,
              height: rightIconSize,
              resizeMode: 'contain',
              tintColor: rightIconTint ?? resolvedIconTint,
            },
            rightIconStyle,
          ]}
        />
      </TouchableOpacity>
    );

    return null;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.wrapper, style]}>

        {/* ── Label ── */}
        {label && (
          <Text
            style={[
              styles.label,
              {
                fontSize: labelFontSize ?? FontSize.Size.small_4x,
                fontFamily: labelFontFamily,
                color: resolvedLabelColor,
              },
              labelStyle,
            ]}
          >
            {label}
            {required && (
              <Text style={{ color: resolvedErrorColor }}> *</Text>
            )}
          </Text>
        )}

        {/* ── Input Row ── */}
        <Animated.View
          style={[
            styles.inputContainer,
            {
              backgroundColor: resolvedBg,
              borderRadius,
              minHeight: inputHeight ?? hp(6.5),
              paddingHorizontal: inputPaddingHorizontal ?? wp(4),
              borderColor: animatedBorderColor,
              borderWidth: animatedBorderWidth,
            },
            containerStyle,
          ]}
        >
          {renderLeftIcon()}

          <TextInput
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={isPassword ? isSecure : false}
            placeholder={placeholder}
            placeholderTextColor={resolvedPlaceholderColor}
            style={[
              styles.input,
              {
                fontSize: inputFontSize ?? FontSize.Size.small_3x,
                fontFamily: inputFontFamily,
                color: inputTextColor,
              },
              inputStyle,
            ]}
            {...props}
          />

          {renderRightIcon()}
        </Animated.View>

        {/* ── Error ── */}
        {error && (
          <Text
            style={[
              styles.errorText,
              {
                color: resolvedErrorColor,
                fontSize: errorFontSize ?? FontSize.Size.small_2x,
              },
            ]}
          >
            {error}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

// ─── Default Eye Icons (fallback when no image provided) ─────────────────────

const DefaultEyeOpenIcon = ({ size, color }: { size: number; color: string }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{
      width: size * 0.85, height: size * 0.55,
      borderRadius: size * 0.4,
      borderWidth: 1.8, borderColor: color,
      justifyContent: 'center', alignItems: 'center',
    }}>
      <View style={{
        width: size * 0.28, height: size * 0.28,
        borderRadius: size * 0.14,
        backgroundColor: color,
      }} />
    </View>
  </View>
);

const DefaultEyeClosedIcon = ({ size, color }: { size: number; color: string }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{
      width: size * 0.75, height: 1.8,
      backgroundColor: color,
      borderRadius: 2,
      transform: [{ rotate: '-15deg' }],
    }} />
    <View style={{
      width: size * 0.85, height: size * 0.32,
      borderBottomLeftRadius: size * 0.4,
      borderBottomRightRadius: size * 0.4,
      borderWidth: 1.8,
      borderTopWidth: 0,
      borderColor: color,
      marginTop: 2,
    }} />
  </View>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginVertical: hp(0.8),
  },
  label: {
    marginBottom: hp(0.8),
    marginLeft: wp(1),
    fontFamily: FontFamily.MANROPE.SEMI_BOLD,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingVertical: hp(1.5),
    paddingHorizontal: 0,
    minWidth: 0,
  },
  leftIconWrapper: {
    marginRight: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconWrapper: {
    marginLeft: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  errorText: {
    marginTop: hp(0.5),
    marginLeft: wp(1),
    fontFamily: FontFamily.MANROPE.MEDIUM,
  },
});


// ─── Usage Examples ───────────────────────────────────────────────────────────
//
// Basic:
{/* <WWTextInput placeholder="Name" leftIconSource={ImageName.UserIcon} />

Email:
<WWTextInput placeholder="Email" leftIconSource={ImageName.EmailIcon} keyboardType="email-address" />

Password with eye toggle:
<WWTextInput placeholder="Password" isPassword leftIconSource={ImageName.LockIcon} />

Password with custom eye icons:
<WWTextInput
  placeholder="Password"
  isPassword
  leftIconSource={ImageName.LockIcon}
  eyeOpenIcon={ImageName.EyeOpen}
  eyeClosedIcon={ImageName.EyeClosed}
/>

With label + error:
<WWTextInput
  label="Email Address"
  required
  placeholder="Enter your email"
  error="Invalid email address"
  leftIconSource={ImageName.EmailIcon}
/>

Full custom:
<WWTextInput
  placeholder="Search"
  inputBgColor="#FFF"
  inputTextColor="#000"
  borderRadius={24}
  inputHeight={56}
  focusBorderColor="#C67C4E"
  leftIconSource={ImageName.SearchIcon}
  leftIconSize={18}
  leftIconTint="#C67C4E"
  rightIconSource={ImageName.ClearIcon}
  onRightIconPress={() => setValue('')}
/> */}