import { ColorName, ColorObject } from './colorName';

export const light: ColorObject = {
  // Brand
  [ColorName.primary]: '#C67C4E',
  [ColorName.secondary]: '#2F5A62',

  // Backgrounds
  [ColorName.background]: '#FAF7F0',
  [ColorName.surface]: '#FFFFFF',
  [ColorName.overlay]: 'rgba(0,0,0,0.4)',

  // Text
  [ColorName.textPrimary]: '#1C1C1C',
  [ColorName.textSecondary]: '#7C7C7C',
  [ColorName.textDisabled]: '#AAAAAA',

  // Border
  [ColorName.border]: '#EEEEEE',

  // Status
  [ColorName.success]: '#3C8E60',
  [ColorName.error]: '#E90000',
  [ColorName.warning]: '#F5A623',
  [ColorName.info]: '#15AE99',

  // Utility
  [ColorName.white]: '#FFFFFF',
  [ColorName.black]: '#1C1C1C',
  [ColorName.transparent]: 'transparent',

  // Ripple
  [ColorName.ripple]: 'rgba(0,0,0,0.08)',
  [ColorName.darkGray] : '#1C1C1C',
};