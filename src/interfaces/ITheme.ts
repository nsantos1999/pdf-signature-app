export type IColor = {
  light: string;
  main: string;
  dark: string;
};

export type IThemePalette = {
  primary: IColor;
  secondary: IColor;
};

export type IFontFamily = {
  normal: string;
  bold: string;
};

export type IFontSize = {
  title: number;
  content: number;
};

export type IThemeTypography = {
  fontSize: IFontSize;
  fontFamily: IFontFamily;
};

export type ITheme = {
  palette: IThemePalette;
  typography: IThemeTypography;
};
