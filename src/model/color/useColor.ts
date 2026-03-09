/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { ColorObject } from './colorName';
import { light } from './light';
import { dark } from './dark';
import { ThemeType, useTheme } from '../theme';

export const useColor = (): ColorObject => {
  const theme = useTheme();
  const isDark = theme.getCurrentTheme() === ThemeType.DARK;

  const [allColors, setAllColors] = useState<ColorObject>(
    isDark ? dark : light
  );

  useEffect(() => {
    setAllColors(isDark ? dark : light);
  }, [isDark]);

  return allColors;
};