import { Theme } from 'baseui/theme'
// import { components } from "./components";
import { createDarkTheme, createLightTheme, createTheme } from 'baseui'


export type BaseThemeType = 'light' | 'dark' | 'deep'
export type ThemeType = BaseThemeType | 'followTheSystem'
export interface IThemedStyleProps {
    theme: Theme
    themeType: BaseThemeType
}

export interface IColors {
  brand1: string
  brand2: string
}

export const colors: IColors = {
  brand1: '#007fff',
  brand2: '#36425D',
}

const primitives = {
  primaryFontFamily: 'Inter',
}

const overrides = {
  'light': {},
  'dark': {},
  'deep': {
    colors: {
      buttonPrimaryFill: '#007FFF',
      buttonBorderRadius: '14px',
      brand1: ''
    },
    typography: {},
  }
}

export default {
  light: createLightTheme(primitives, overrides.light),
  dark: createDarkTheme(primitives, overrides.dark),
  deep: createTheme(primitives, overrides.deep),
} as { [key in BaseThemeType]: Theme };
