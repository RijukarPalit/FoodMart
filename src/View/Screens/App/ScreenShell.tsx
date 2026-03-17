import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ColorName, useColor } from '../../../model/color';
import { FontFamily } from '../../../adapter/asserts/fonts';

const ScreenShell = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const color = useColor();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: color[ColorName.background] },
      ]}
    >
      <View style={styles.card}>
        <Text
          style={[
            styles.title,
            { color: color[ColorName.textPrimary] },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: color[ColorName.textSecondary] },
          ]}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontFamily: FontFamily.ROBOTO_SLAB.BOLD,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: FontFamily.MANROPE.MEDIUM,
  },
});

export default ScreenShell;
