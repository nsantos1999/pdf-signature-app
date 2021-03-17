import {ITheme} from '@interfaces/ITheme';

const defaultTheme: ITheme = {
  palette: {
    primary: '#9b59b6',
    secondary: '#2c3e50',
  },
  typography: {
    fontFamily: {
      bold: 'Nexa Bold',
      normal: 'Nexa Regular',
    },
    fontSize: {
      title: 24,
      content: 18,
    },
  },
};

export {defaultTheme};
