// @ts-nocheck
import { PartialTheme } from '@fluentui/react';

export const defaultTheme: PartialTheme = {
  stylesheets: [
    `
    body {
        margin: 0;
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    * {
        box-sizing: border-box;
    }
    *:before {
        box-sizing: border-box;
    }
    *:after {
        box-sizing: border-box;
    }
    `,
  ],
};

export const lightPaletteAlt: PartialTheme = {
  palette: {
    themePrimary: '#106ebe',
    themeLighterAlt: '#f3f8fc',
    themeLighter: '#d1e4f5',
    themeLight: '#abcdec',
    themeTertiary: '#61a1d9',
    themeSecondary: '#267cc7',
    themeDarkAlt: '#0e62ac',
    themeDark: '#0c5391',
    themeDarker: '#093d6b',
    neutralLighterAlt: '#e9e9e9',
    neutralLighter: '#e5e5e5',
    neutralLight: '#dcdcdc',
    neutralQuaternaryAlt: '#cdcdcd',
    neutralQuaternary: '#c4c4c4',
    neutralTertiaryAlt: '#bcbcbc',
    neutralTertiary: '#595959',
    neutralSecondary: '#373737',
    neutralPrimaryAlt: '#2f2f2f',
    neutralPrimary: '#000000',
    neutralDark: '#151515',
    black: '#0b0b0b',
    white: '#f0f0f0',
  },
};

export const darkPalette: PartialTheme = {
  palette: {
    themePrimary: '#2EA1FE',
    themeLighterAlt: '#02060a',
    themeLighter: '#071a29',
    themeLight: '#0e304d',
    themeTertiary: '#1c6199',
    themeSecondary: '#288ee0',
    themeDarkAlt: '#43aaff',
    themeDark: '#60b7ff',
    themeDarker: '#8acaff',
    neutralLighterAlt: '#343434',
    neutralLighter: '#3d3d3d',
    neutralLight: '#4a4a4a',
    neutralQuaternaryAlt: '#525252',
    neutralQuaternary: '#595959',
    neutralTertiaryAlt: '#757575',
    neutralTertiary: '#c8c8c8',
    neutralSecondary: '#d0d0d0',
    neutralPrimaryAlt: '#dadada',
    neutralPrimary: '#ffffff',
    neutralDark: '#f4f4f4',
    black: '#f8f8f8',
    white: '#2c2c2c',
  },
};

export const darkPaletteAlt: PartialTheme = {
  palette: {
    themePrimary: '#54b2ff',
    themeLighterAlt: '#03070a',
    themeLighter: '#0d1c29',
    themeLight: '#19354d',
    themeTertiary: '#326b99',
    themeSecondary: '#4a9de0',
    themeDarkAlt: '#65baff',
    themeDark: '#7dc5ff',
    themeDarker: '#9fd4ff',
    neutralLighterAlt: '#484848',
    neutralLighter: '#4f4f4f',
    neutralLight: '#5b5b5b',
    neutralQuaternaryAlt: '#636363',
    neutralQuaternary: '#696969',
    neutralTertiaryAlt: '#828282',
    neutralTertiary: '#c8c8c8',
    neutralSecondary: '#d0d0d0',
    neutralPrimaryAlt: '#dadada',
    neutralPrimary: '#ffffff',
    neutralDark: '#f4f4f4',
    black: '#f8f8f8',
    white: 'rgb(64, 64, 64)',
  },
};
