import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { WatchlistProvider } from './src/context/WatchlistContext';
import WatchlistScreen from './src/screens/WatchlistScreen';
import AddMovieScreen from './src/screens/AddMovieScreen';
import StatsScreen from './src/screens/StatsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <WatchlistProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <Tab.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: '#1e1e2e' },
                headerTintColor: '#cdd6f4',
                headerTitleStyle: { fontWeight: '700' },
                tabBarStyle: { backgroundColor: '#1e1e2e', borderTopColor: '#313244' },
                tabBarActiveTintColor: '#cba6f7',
                tabBarInactiveTintColor: '#6c7086',
              }}
            >
              <Tab.Screen
                name="Watchlist"
                component={WatchlistScreen}
                options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>🎬</Text> }}
              />
              <Tab.Screen
                name="Add Movie"
                component={AddMovieScreen}
                options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>➕</Text> }}
              />
              <Tab.Screen
                name="Stats"
                component={StatsScreen}
                options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>📊</Text> }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </WatchlistProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
