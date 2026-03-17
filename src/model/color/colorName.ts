// ─── Color Name Enum ───────────────────────────────────────────────────────
export enum ColorName {
    // Brand
    primary = 'primary',    // #C67C4E  (warm brown-orange)
    secondary = 'secondary',  // #2F5A62  (deep teal)

    // Backgrounds
    background = 'background', // page/screen bg
    surface = 'surface',    // card/sheet bg
    overlay = 'overlay',    // modal scrim

    // Text
    textPrimary = 'textPrimary',   // main text
    textSecondary = 'textSecondary', // subtle text
    textDisabled = 'textDisabled',  // placeholder / disabled

    // Border
    border = 'border',     // dividers, outlines

    // Status
    success = 'success',    // #3C8E60
    error = 'error',      // #E90000
    warning = 'warning',    // #F5A623
    info = 'info',       // #15AE99

    // Utility
    white = 'white',      // #FFFFFF
    black = 'black',      // #1C1C1C
    transparent = 'transparent',

    // Ripple / press feedback
    ripple = 'ripple',
    darkGray = 'darkGray',

    backgroudColor = 'backgroudColor', //#FAF7F0
    Greentxt = 'Greentxt', //#18795B
    Blacktxt = 'Blacktxt', //#505050,
    placeholderTxt = 'placeholderTxt', //#7F7F7F
    placeholderTxt2 = 'placeholderTxt2', //#E4E6DF80
    GreyVariant = 'GreyVariant', //#7C7C7C,
    GreenVariant = 'GreenVariant', //#3C8E60
    lightPink1 = '#F18F84',
    lightPink2 = '#F18F8466',
    lightPink3 = 'lightPink3', //#EDD6C8
    // Additional Colors
    Black = 'Black',
    Grey1 = 'Grey1',
    Grey2 = 'Grey2',
    Grey3 = 'Grey3',
    Grey4 = 'Grey4',
    Grey5 = 'Grey5',
    Grey6 = 'Grey6',
    Grey7 = 'Grey7',
    Grey8 = 'Grey8',
    White = 'White',
    OysterWhite = 'OysterWhite',
    Ripple = 'Ripple',
    Red = 'Red',
    LightGreen = 'LightGreen',
    darkGray2 = 'darkGray2',

}

export type ColorObject = { [key in ColorName]: string };