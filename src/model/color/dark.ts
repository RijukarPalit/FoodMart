import { ColorName, ColorObject } from './colorName';

export const dark: ColorObject = {
    // Brand
    [ColorName.primary]: '#D4895A',  // slightly lighter for dark bg
    [ColorName.secondary]: '#4A8A94',  // slightly lighter for dark bg

    // Backgrounds
    [ColorName.background]: '#121212',
    [ColorName.surface]: '#1E1E1E',
    [ColorName.overlay]: 'rgba(0,0,0,0.6)',

    // Text
    [ColorName.textPrimary]: '#F5F5F5',
    [ColorName.textSecondary]: '#AAAAAA',
    [ColorName.textDisabled]: '#555555',

    // Border
    [ColorName.border]: '#2C2C2C',

    // Status
    [ColorName.success]: '#4CAF7D',
    [ColorName.error]: '#FF4444',
    [ColorName.warning]: '#FFB74D',
    [ColorName.info]: '#26C6B0',

    // Utility
    [ColorName.white]: '#FFFFFF',
    [ColorName.black]: '#000000',
    [ColorName.transparent]: 'transparent',

    // Ripple
    [ColorName.ripple]: 'rgba(255,255,255,0.08)',
};