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
}

export type ColorObject = { [key in ColorName]: string };