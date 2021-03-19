import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '@screens/Home';
import {SignPdfProvider} from '@contexts/SignPdfContext';
import {DocumentPreview} from '@screens/DocumentPreview';
import {StatusBar} from 'react-native';
import {useTheme} from '@contexts/ThemeContext';
import {SignDocument} from '@screens/SignDocument';

const Stack = createStackNavigator();

export function MainStack() {
  const {theme} = useTheme();

  return (
    <SignPdfProvider>
      <StatusBar backgroundColor={theme.palette.primary.dark} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DocumentPreview" component={DocumentPreview} />
        <Stack.Screen name="SignDocument" component={SignDocument} />
      </Stack.Navigator>
    </SignPdfProvider>
  );
}
