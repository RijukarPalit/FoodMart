import React, { useMemo, useRef } from 'react';
import {
  StyleProp,
  ViewStyle,
  StyleSheet,
  Pressable,
  Platform,
  Animated,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import { Fonts } from '../../adapter/asserts';
import { useFontSize } from '../../hooks/useFontSize';
import { FontSize } from '../../adapter/constants';
// import { WWText, WWView, WWActivityIndicator } from '../../atoms';
// import { useFontSize } from '../../../../hooks';
// import { FontSize } from '../../../../constants';
// import { Fonts } from '../../../../assets';

type ButtonType =
  | 'filled'
  | 'themed-outline'
  | 'transparent'
  | 'secondary'
  | 'error'
  | 'outline';

type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  type?: ButtonType;
  label?: string;
  onPress?: () => void;
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  disabled?: boolean;
  backgroundColor?: string;
  size?: ButtonSize;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  stretched?: boolean;
  textColor?: string;
  rippleConfig?: {
    color?: string;
    borderless?: boolean;
  };
}

export const WWButton: React.FC<ButtonProps> = ({
  type = 'filled',
  label = 'Button',
  onPress,
  leftIcon,
  rightIcon,
  disabled = false,
  backgroundColor,
  size = 'medium',
  loading = false,
  style,
  stretched = false,
  textColor,
  rippleConfig,
}) => {
  const styles = getButtonStyles();

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.97,
        useNativeDriver: true,
        speed: 20,
        bounciness: 0,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.6,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 0,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const buttonStyle = useMemo(() => {
    switch (type) {
      case 'filled':
        return styles.filledButton;
      case 'themed-outline':
        return styles.themedButton;
      case 'transparent':
        return styles.transparentButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'error':
        return styles.dangerButton;
      case 'outline':
        return styles.outlineButton;
      default:
        return styles.filledButton;
    }
  }, [type]);

  const labelColor = useMemo(() => {
    if (textColor) return textColor;

    switch (type) {
      case 'filled':
      case 'error':
      case 'secondary':
        return '#FFFFFF';
      case 'themed-outline':
      case 'transparent':
        return '#1E88E5';
      case 'outline':
        return '#15AE99';
      default:
        return '#FFFFFF';
    }
  }, [type, textColor]);

  const sizeStyle = useMemo(() => {
    return {
      small: styles.smallButton,
      medium: styles.mediumButton,
      large: styles.largeButton,
    }[size];
  }, [size]);

  const fontSizeMap = {
    small: useFontSize(FontSize.Size.small_3x),
    medium: useFontSize(FontSize.Size.small_5x),
    large: useFontSize(FontSize.Size.medium_3x),
  };

  const activityIndicatorSizeMap = {
    small: 16,
    medium: 20,
    large: 24,
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim }}>
      <Pressable
        android_ripple={
          Platform.OS === 'android'
            ? {
              color: rippleConfig?.color ?? 'rgba(255,255,255,0.15)',
              borderless: rippleConfig?.borderless ?? false,
            }
            : undefined
        }
        onPressIn={animateIn}
        onPressOut={animateOut}
        style={[
          styles.baseButton,
          buttonStyle,
          sizeStyle,
          stretched && styles.stretched,
          backgroundColor && { backgroundColor },
          (disabled || loading) && styles.disabled,
          style,
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        // 💡 FIX APPLIED HERE: Removed optional chaining (?) as label is guaranteed to be a string
        testID={`ww-button-${label.toLowerCase().replace(/\s+/g, '-')}`}
        accessibilityRole="button"
      >
        {leftIcon && !loading && (
          <View style={styles.iconContainer}>{leftIcon}</View>
        )}

        <View style={styles.labelContainer}>
          {loading ? (
            <ActivityIndicator
              color={labelColor}
              size={activityIndicatorSizeMap[size]}
            />
          ) : (
            <Text
              style={[
                styles.label,
                { color: labelColor, fontSize: useFontSize(fontSizeMap[size]) },
                disabled && styles.disabledText,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {label}
            </Text>
          )}
        </View>

        {rightIcon && !loading && (
          <View style={styles.iconContainer}>{rightIcon}</View>
        )}
      </Pressable>
    </Animated.View>
  );
};

const getButtonStyles = () =>
  StyleSheet.create({
    baseButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      borderWidth: 1,
      minHeight: 48,
      overflow: 'hidden',
    },
    filledButton: {
      backgroundColor: '#15AE99',
      borderColor: '#15AE99',
    },
    themedButton: {
      backgroundColor: 'transparent',
      borderColor: '#1E88E5',
    },
    transparentButton: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    secondaryButton: {
      backgroundColor: '#15AE99',
      borderColor: '#15AE99',
    },
    dangerButton: {
      backgroundColor: '#D32F2F',
      borderColor: '#D32F2F',
    },
    outlineButton: {
      backgroundColor: 'transparent',
      borderColor: '#15AE99',
    },
    smallButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      minHeight: 36,
    },
    mediumButton: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      minHeight: 44,
    },
    largeButton: {
      paddingVertical: 18,
      paddingHorizontal: 24,
      minHeight: 52,
    },
    label: {
      textAlign: 'center',
      fontFamily: Fonts.FontFamily.MANROPE.MEDIUM,
      fontWeight: '700',
    },
    disabledText: {
      color: '#A0A0A0',
    },
    labelContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 4,
    },
    disabled: {
      opacity: 0.5,
    },
    stretched: {
      width: '100%',
    },
  });