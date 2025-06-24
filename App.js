import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import SurahListScreen from './screens/SurahListScreen';
import SurahDetailScreen from './screens/SurahDetailScreen';
import SurahTafsirScreen from './screens/SurahTafsirScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: { backgroundColor: '#D81B60' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SurahList"
          component={SurahListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SurahDetail"
          component={SurahDetailScreen}
          options={{ title: 'Detail Surat' }}
        />
        <Stack.Screen
          name="SurahTafsir"
          component={SurahTafsirScreen}
          options={{ title: 'Tafsir Surat' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
