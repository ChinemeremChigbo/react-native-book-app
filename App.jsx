import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import RootNavigator from './src/RootNavigator';
import StatusModal from './src/components/StatusModal';
import ToastContainer from './src/components/Toast';
import getTheme from './src/theme';

export default function App() {
  const scheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={getTheme(scheme)}>
        <StatusBar />
        <StatusModal />
        <RootNavigator />
        <ToastContainer />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
