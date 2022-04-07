import { Theme, Colors } from 'baseui/theme'
import color from 'color'
// import { components } from "./components";
import {
    createDarkTheme,
    createLightTheme,
    createTheme,
    DarkTheme as BaseDarkTheme,
    lightThemePrimitives,
    darkThemePrimitives,
} from 'baseui'

export type BaseThemeType = 'light' | 'dark' | 'deep'
export type ThemeType = BaseThemeType | 'followTheSystem'

export interface IThemedStyleProps {
    theme: Theme
    themeType: BaseThemeType
}

// custom ui primitives
export interface IColors extends Partial<Colors> {
    brand1: string
    brand2: string
    brandBackground: string
}

export const colors: IColors = {
    brand1: '#007fff',
    brand2: '#36425D',
    brandBackground: '#F0F2F5',
}

// base ui primitives
const primitives = {
    primaryFontFamily: 'Inter',
}

const overrides = {
    light: {
        colors: {
            // ----------- custom -----------
            brandRootBackground: '#fdfdfd',
        },
    },
    dark: {
        colors: {
            // ----------- custom -----------
            brandRootBackground: BaseDarkTheme.colors.backgroundPrimary,
            brandHeaderBackground: color(BaseDarkTheme.colors.backgroundPrimary).fade(0.5).string(),
        },
    },
    deep: {
        colors: {
            buttonPrimaryFill: '#007FFF',
            buttonBorderRadius: '14px',
            // ----------- custom -----------
            brandRootBackground: colors.brandBackground,
            brandHeaderBackground: colors.brand2,
        },
        typography: {},
    },
}

export const DeepTheme: Theme = createLightTheme(primitives, overrides.deep)
export const LightTheme: Theme = createLightTheme(primitives, overrides.light)
export const DarkTheme: Theme = createDarkTheme(primitives, overrides.dark)

export default {
    light: LightTheme,
    dark: DarkTheme,
    deep: DeepTheme,
} as { [key in BaseThemeType]: Theme }
