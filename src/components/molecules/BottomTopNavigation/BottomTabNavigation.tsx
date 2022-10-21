import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SettingsScreen } from '@screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeScreen } from '@screens/HomeScreen';
import { FavoritesScreen } from '@screens/FavoritesScreen';
import { StatisticsScreen } from '@screens/StatisticsScreen';
import { colors, fontSize } from '../../../design/tokens';

const Tab = createMaterialBottomTabNavigator();

export const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={colors.lightGreen}
      barStyle={{ backgroundColor: colors.pureWhite }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home-sharp" color={color} size={fontSize.xl} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color }) => (
            <Icon name="bookmark" color={color} size={fontSize.xl} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          tabBarLabel: 'Statistics',
          tabBarIcon: ({ color }) => (
            <Icon name="bar-chart-sharp" color={color} size={fontSize.xl} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <Icon name="settings-sharp" color={color} size={fontSize.xl} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
