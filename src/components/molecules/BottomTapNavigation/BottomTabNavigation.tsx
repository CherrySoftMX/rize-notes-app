import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { SettingsScreen } from '@screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeScreen } from '@screens/HomeScreen';
import { FavoritesScreen } from '@screens/FavoritesScreen';
import { StatisticsScreen } from '@screens/StatisticsScreen';
import { colors, fontSize } from '../../../design/tokens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FolderScreen } from '@screens/FolderScreen';
import { RegisterScreen } from '@screens/RegisterScreen';
import { LoginScreen } from '@screens/LoginScreen';
import { NoteScreen } from '@screens/NoteScreen';
import { SearchScreen } from '@screens/SearchScreen';

const Tab = createMaterialBottomTabNavigator();
const Base = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();
const FavoritesStack = createNativeStackNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      activeColor={colors.lightGreen}
      barStyle={{ backgroundColor: colors.pureWhite }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreens}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home-sharp" color={color} size={fontSize.xl} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesStack"
        component={FavoritesStackScreens}
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

const HomeStackScreens = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Folder" component={FolderScreen} />
      <HomeStack.Screen name="Note" component={NoteScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
    </HomeStack.Navigator>
  );
};

const FavoritesStackScreens = () => {
  return (
    <FavoritesStack.Navigator screenOptions={{ headerShown: false }}>
      <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} />
      <FavoritesStack.Screen name="Note" component={NoteScreen} />
    </FavoritesStack.Navigator>
  );
};

export const BottomTabNavigation = () => {
  return (
    <Base.Navigator screenOptions={{ headerShown: false }}>
      <Base.Screen name="Home" component={TabNavigation} />
      <Base.Screen name="Register" component={RegisterScreen} />
      <Base.Screen name="Login" component={LoginScreen} />
      <Base.Screen name="Search" component={SearchScreen} />
    </Base.Navigator>
  );
};
