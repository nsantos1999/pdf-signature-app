import {ITheme} from '@interfaces/ITheme';
import Color from 'color';

const PRIMARY_COLOR = '#282a36';
const SECONDARY_COLOR = '#2c3e50';

const defaultTheme: ITheme = {
  palette: {
    primary: {
      light: Color(PRIMARY_COLOR, 'hex').lighten(0.3).hex(),
      main: PRIMARY_COLOR,
      dark: Color(PRIMARY_COLOR, 'hex').darken(0.3).hex(),
    },
    secondary: {
      light: Color(SECONDARY_COLOR, 'hex').lighten(0.3).hex(),
      main: SECONDARY_COLOR,
      dark: Color(SECONDARY_COLOR, 'hex').darken(0.3).hex(),
    },
  },
  typography: {
    fontFamily: {
      bold: 'Nexa-Bold',
      normal: 'Nexa-Regular',
    },
    fontSize: {
      title: 24,
      content: 18,
    },
  },
};

export {defaultTheme, PRIMARY_COLOR, SECONDARY_COLOR};
