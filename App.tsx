/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import type {Node} from 'react';
import {useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ThemeProvider} from '@contexts/ThemeContext';
import {MainStack} from '@navigations/stack/MainStack';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {defaultTheme} from '@constants/DefaultTheme';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  console.log(backgroundStyle);

  return (
    <ThemeProvider defaultTheme={defaultTheme}>
      <NavigationContainer>
        <MainStack />
        <Toast ref={ref => Toast.setRef(ref)} />
      </NavigationContainer>
    </ThemeProvider>
  );
};
export default App;
