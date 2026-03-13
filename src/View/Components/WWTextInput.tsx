
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
  View,
  TextStyle,
  Text,
} from "react-native";
import { ColorName, ColorObject, useColor } from "../../model/color";
import { useFontSize } from "../../hooks/useFontSize";
import { FontSize } from "../../adapter/constants";
import WWAnimatedView from "./WWAnimatedView";
import { FontFamily } from "../../adapter/asserts/fonts";


export type InputFieldProps = RNTextInputProps & {
  label?: string;
  required?: boolean;
  error?: string | null;
  isPassword?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export const WWTextInput: React.FC<InputFieldProps> = ({
  label,
  value = "",
  error,
  required,
  style,
  onChangeText,
  isPassword,
  leftIcon,
  rightIcon,
  placeholder,
  inputStyle,
  labelStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  // Call all hooks at the top level - BEFORE any conditional rendering
  const color = useColor();
  const labelFontSize = useFontSize(FontSize.Size.small_4x);
  const inputFontSize = useFontSize(FontSize.Size.small_3x);
  const errorFontSize = useFontSize(FontSize.Size.small_2x);
  const styles = getStyles(color);

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: error ? 2 : isFocused ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isFocused, error]);

  const animatedBorderStyle = {
    borderColor: borderAnim.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [
        color?.[ColorName.Grey1] ?? "#999",
        color?.[ColorName.Grey1] ?? "#999",
        color?.[ColorName.Red] ?? "#E90000",
      ]
    //   outputRange: [color.Quinary, color.Default, color.Red],
    }),
    borderWidth: borderAnim.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [1, 2, 2],
    }),
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, style]}>
        {/* Label */}
        {label && (
          <View style={styles.labelContainer}>
            <Text
              style={[
                styles.label,
                {
                  color: color?.[ColorName.Grey1] ?? "#999",
                  fontSize: labelFontSize
                },
                labelStyle
              ]}
            >
              {label}
              {required && (
                <Text
                  style={[
                    styles.required,
                    {
                      color: color?.[ColorName.Red] ?? "#E90000",
                      fontSize: labelFontSize
                    }
                  ]}
                >
                  *
                </Text>
              )}
            </Text>
          </View>
        )}

        {/* Input field */}
        <Animated.View style={[styles.inputContainer, animatedBorderStyle, styles.flexRow, inputStyle]}>
          {leftIcon && <View style={styles.leftIconWrapper}>{leftIcon}</View>}

          <TextInput
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={isPassword}
            placeholder={placeholder}
            placeholderTextColor={color?.[ColorName.Grey1] ?? "#999"}
            style={[styles.input, { fontSize: inputFontSize }]}
            {...props}
          />

          {rightIcon && <View style={styles.rightIconWrapper}>{rightIcon}</View>}
        </Animated.View>

        {/* Error */}
        {error && (
          <WWAnimatedView>
            <Text
              style={[
                styles.errorText,
                {
                  color: color?.[ColorName.Red] ?? "#E90000",
                  fontSize: errorFontSize
                }
              ]}
            >
              {error}
            </Text>
          </WWAnimatedView>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const getStyles = (color: ColorObject) =>
  StyleSheet.create({
    container: {
      width: "100%",
      marginVertical: 8,
    },
    labelContainer: {
      marginBottom: 8,
    },
    label: {
      fontFamily: FontFamily.MANROPE.SEMI_BOLD,
      lineHeight: 20,
    },
    required: {
      fontFamily: FontFamily.MANROPE.SEMI_BOLD,
    },
    inputContainer: {
      borderRadius: 18,
      paddingHorizontal: 20,
      paddingVertical: 2,
      backgroundColor: color?.[ColorName.placeholderTxt2],
      minHeight: 50,
    },
    input: {
      flex: 1,
      minWidth: 0,
      fontFamily: FontFamily.MANROPE.SEMI_BOLD,
      color: "#333",
      paddingVertical: 12,
      paddingHorizontal: 0,
    },
    leftIconWrapper: {
      marginRight: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    rightIconWrapper: {
      marginLeft: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    errorText: {
      fontFamily: FontFamily.MANROPE.SEMI_BOLD,
      marginTop: 4,
      marginLeft: 4,
    },
    flexRow: {
      flexDirection: "row",
      alignItems: "center",
    },
  });


// Usage
{/* <WWTextInput
  label="Password"
  value={password}
  required
  secureTextEntry={true}
  onChangeText={setPassword}
  rightIcon={<IconComponent.CloseEye />}
/> */}
