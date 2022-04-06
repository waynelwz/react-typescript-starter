import { Theme, Colors } from 'baseui/theme'
// import { components } from "./components";
import { createDarkTheme, createLightTheme, createTheme, lightThemePrimitives, darkThemePrimitives } from 'baseui'


export type BaseThemeType = 'light' | 'dark' | 'deep'
export type ThemeType = BaseThemeType | 'followTheSystem'
export interface IThemedStyleProps {
    theme: Theme
    themeType: BaseThemeType
}

// custom ui primitives
export interface IColors {
  brand1: string
  brand2: string
}

export const colors: IColors = {
  brand1: '#007fff',
  brand2: '#36425D',
}

// 
const primitives = {
  primaryFontFamily: 'Inter',
}

const overrides = {
  'light': {
    colors: {
      brandRootBackground: '#fdfdfd',
    }
  },
  'dark': {},
  'deep': {
    colors: {
      buttonPrimaryFill: '#007FFF',
      buttonBorderRadius: '14px',
      brandRootBackground: lightThemePrimitives.accent
    },
    typography: {},
  }
}

export default {
  light: createLightTheme(primitives, overrides.light),
  dark: createDarkTheme(primitives, overrides.dark),
  deep: createTheme(primitives, overrides.deep),
} as { [key in BaseThemeType]: Theme };
