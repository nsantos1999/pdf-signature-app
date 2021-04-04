import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '@screens/Home';

import {useTheme} from '@contexts/ThemeContext';

import {DocumentPreview} from '@screens/DocumentPreview';
import {StatusBar} from 'react-native';

import {SignDocument} from '@screens/SignDocument';
import {SelectSignatureLocation} from '@screens/SelectSignatureLocation';

const Stack = createStackNavigator();

export function MainStack() {
  const {theme} = useTheme();

  return (
    <>
      <StatusBar backgroundColor={theme.palette.primary.dark} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DocumentPreview" component={DocumentPreview} />
        <Stack.Screen
          name="SelectSignatureLocation"
          component={SelectSignatureLocation}
        />
        <Stack.Screen name="SignDocument" component={SignDocument} />
      </Stack.Navigator>
    </>
  );
}
