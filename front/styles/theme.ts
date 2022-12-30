import { DefaultTheme } from "styled-components";
import { colors, fontSize, borderSize } from "./common_style";

const defaultTheme = {
  fontSize: {
    textXl: fontSize.textXl,
    textLg: fontSize.textLg,
    textMd: fontSize.textMd,
    textMain: fontSize.textMain,
    textSm: fontSize.textSm,
    textXs: fontSize.textXs,
  },
  borderSize: {
    borderMd: borderSize.borderMd,
    borderSm: borderSize.borderSm,
  },
};

export const lightTheme: DefaultTheme = {
  color: {
    background: colors.gray_100,
    nav: colors.white,
    purpleBox: colors.purple_100,
    grayBox: colors.gray_200,
    button: colors.purple_600,
    buttonHover: colors.purple_400,
    point: colors.purple_700,
    border: colors.gray_300,
    borderPoint: colors.purple_600,
    shadow: colors.gray_300,
    dark_shadow: colors.gray_300,
    fontMain: colors.gray_500,
    fontSub: colors.gray_300,
    white: colors.white,
    fontPoint: colors.purple_700,
    fontDark: colors.gray_700,
  },
  ...defaultTheme,
};

export const darkTheme: DefaultTheme = {
  color: {
    background: colors.gray_900,
    nav: colors.gray_800,
    purpleBox: colors.gray_600,
    grayBox: colors.gray_700,
    button: colors.purple_700,
    buttonHover: colors.purple_400,
    point: colors.purple_500,
    border: colors.gray_400,
    borderPoint: colors.purple_600,
    shadow: colors.black2,
    dark_shadow: "#161616",
    fontMain: colors.white,
    fontSub: colors.gray_300,
    white: colors.white,
    fontPoint: colors.purple_700,
    fontDark: colors.white,
  },
  ...defaultTheme,
};
