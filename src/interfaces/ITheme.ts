export type IThemePalette = {
  primary: string;
  secondary: string;
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
