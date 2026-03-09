// hooks/useDimensions.ts
import { Dimensions, ScaledSize } from 'react-native';
import { useState, useEffect } from 'react';

export interface DimensionsData {
    screenWidth: number;
    screenHeight: number;
    isPortrait: boolean;
    isTablet: boolean;
}

export type OrientationChangeCallback = (dimensions: DimensionsData) => void;

export const useDimensions = (onOrientationChange?: OrientationChangeCallback) => {
    const [dimensions, setDimensions] = useState<DimensionsData>(() => {
        const { width, height } = Dimensions.get('window');
        return {
            screenWidth: width,
            screenHeight: height,
            isPortrait: height >= width,
            isTablet: Math.min(width, height) >= 600
        };
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }: { window: ScaledSize }) => {

            const newDimensions: DimensionsData = {
                screenWidth: window.width,
                screenHeight: window.height,
                isPortrait: window.height >= window.width,
                isTablet: Math.min(window.width, window.height) >= 600
            };

            // Call custom event if provided
            if (onOrientationChange) {
                onOrientationChange(newDimensions);
            }

            setDimensions(newDimensions);
        });

        return () => subscription?.remove();
    }, [onOrientationChange]);

    return dimensions;
};


// Get device type based on screen width
export const getDeviceType = (): 'small' | 'medium' | 'large' => {
    const { width } = Dimensions.get('window');
    if (width < 375) return 'small';
    if (width < 768) return 'medium';
    return 'large';
};

