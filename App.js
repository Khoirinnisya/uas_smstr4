import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SurahListScreen from './screens/SurahListScreen';
import SurahDetailScreen from './screens/SurahDetailScreen';
import SurahTafsirScreen from './screens/SurahTafsirScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SurahList">
        <Stack.Screen
          name="SurahList"
          component={SurahListScreen}
          options={{ title: 'Daftar Surat' }}
        />
        <Stack.Screen
          name="DetailScreen"
          component={SurahDetailScreen}
          options={{ title: 'Detail Surat' }}
        />
        <Stack.Screen
          name="TafsirScreen"
          component={SurahTafsirScreen}
          options={{ title: 'Tafsir Surat' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
