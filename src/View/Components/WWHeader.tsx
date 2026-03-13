import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { hp, wp } from '../../utils/dimention';
import { FontFamily } from '../../adapter/asserts/fonts';
import { FontSize } from '../../adapter/constants';

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeaderIconProps {
  source: ImageSourcePropType;
  onPress?: () => void;
  size?: number;
  iconStyle?: ImageStyle;
  containerStyle?: ViewStyle;
  disabled?: boolean;
}

interface WWHeaderProps {
  // ── Title ──────────────────────────────────────────────────────────────────
  title?: string;
  titleStyle?: TextStyle;
  titleFontSize?: number;
  titleFontFamily?: string;
  titleFontWeight?: TextStyle['fontWeight'];
  /** Title color. Default: '#1C1C1C' */
  titleColor?: string;

  // ── Back Button ────────────────────────────────────────────────────────────
  showBackButton?: boolean;
  backIcon?: ImageSourcePropType;
  onBackPress?: () => void;
  backIconSize?: number;
  backIconStyle?: ImageStyle;
  backButtonStyle?: ViewStyle;

  // ── Right Icon ─────────────────────────────────────────────────────────────
  showRightIcon?: boolean;
  rightIcon?: ImageSourcePropType;
  onRightPress?: () => void;
  rightIconSize?: number;
  rightIconStyle?: ImageStyle;
  rightButtonStyle?: ViewStyle;
  rightComponent?: React.ReactNode;

  // ── Container ──────────────────────────────────────────────────────────────
  containerStyle?: ViewStyle;
  backgroundColor?: string;
  height?: number;
  horizontalPadding?: number;
  showBorder?: boolean;
  /** Border color. Default: '#EEEEEE' */
  borderColor?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const WWHeader: React.FC<WWHeaderProps> = ({
  // Title
  title,
  titleStyle,
  titleFontSize,
  titleFontFamily = FontFamily.MANROPE.BOLD,
  titleFontWeight,
  titleColor = '#1C1C1C',

  // Back Button
  showBackButton = true,
  backIcon,
  onBackPress,
  backIconSize = 24,
  backIconStyle,
  backButtonStyle,

  // Right Icon
  showRightIcon = false,
  rightIcon,
  onRightPress,
  rightIconSize = 24,
  rightIconStyle,
  rightButtonStyle,
  rightComponent,

  // Container
  containerStyle,
  backgroundColor = 'transparent',
  height,
  horizontalPadding,
  showBorder = false,
  borderColor = '#EEEEEE',
}) => {
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const headerHeight = height ?? hp(7);
  const hPadding = horizontalPadding ?? wp(5);

  return (
    <View
      style={[
        styles.container,
        {
          height: headerHeight,
          backgroundColor,
          paddingHorizontal: hPadding,
          borderBottomWidth: showBorder ? 1 : 0,
          borderBottomColor: borderColor,
        },
        containerStyle,
      ]}
    >
      {/* ── Left: Back Button ── */}
      <View style={styles.sideSlot}>
        {showBackButton && (
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.7}
            style={[styles.iconButton, backButtonStyle]}
          >
            {backIcon ? (
              <Image
                source={backIcon}
                style={[
                  {
                    width: backIconSize,
                    height: backIconSize,
                    resizeMode: 'contain',
                  },
                  backIconStyle,
                ]}
              />
            ) : (
              // Default fallback arrow if no icon provided
              <View style={[styles.defaultBackArrow, { width: backIconSize, height: backIconSize }]}>
                <View style={styles.arrowLeft} />
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* ── Center: Title ── */}
      <View style={styles.titleSlot}>
        {title ? (
          <Text
            style={[
              styles.title,
              {
                fontSize: titleFontSize ?? FontSize.Size.small_5x,
                fontFamily: titleFontFamily,
                fontWeight: titleFontWeight,
                color: titleColor,
              },
              titleStyle,
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
        ) : null}
      </View>

      {/* ── Right: Icon Button ── */}
      <View style={[styles.sideSlot, styles.rightSlot]}>
        {rightComponent
          ? rightComponent
          : showRightIcon && rightIcon
          ? (
            <TouchableOpacity
              onPress={onRightPress}
              activeOpacity={0.7}
              style={[styles.iconButton, rightButtonStyle]}
              disabled={!onRightPress}
            >
              <Image
                source={rightIcon}
                style={[
                  {
                    width: rightIconSize,
                    height: rightIconSize,
                    resizeMode: 'contain',
                  },
                  rightIconStyle,
                ]}
              />
            </TouchableOpacity>
          )
          : (
            // Empty placeholder to keep title centered
            <View style={{ width: 40 }} />
          )
        }
      </View>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideSlot: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightSlot: {
    alignItems: 'flex-end',
  },
  titleSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(2),
  },
  title: {
    textAlign: 'center',
  },
  iconButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Default back arrow (shown when no backIcon provided)
  defaultBackArrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowLeft: {
    width: 12,
    height: 12,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#1C1C1C',
    transform: [{ rotate: '45deg' }],
    marginLeft: 4,
  },
});