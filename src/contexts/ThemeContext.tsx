import {ITheme} from '@interfaces/ITheme';
import React, {createContext, useContext, useState} from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme: ITheme;
};

type IThemeContext = {
  theme: ITheme;
  setTheme: (theme: ITheme) => void;
};

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

function ThemeProvider({children, defaultTheme}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ITheme>(defaultTheme);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const themeContext = useContext(ThemeContext);

  return themeContext;
}

export {ThemeProvider, useTheme};
