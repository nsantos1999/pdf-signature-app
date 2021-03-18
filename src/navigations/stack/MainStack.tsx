import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '@screens/Home';
import {SignPdfProvider} from '@contexts/SignPdfContext';
import {DocumentPreview} from '@screens/DocumentPreview';

const Stack = createStackNavigator();

export function MainStack() {
  return (
    <SignPdfProvider>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DocumentPreview" component={DocumentPreview} />
      </Stack.Navigator>
    </SignPdfProvider>
  );
}
