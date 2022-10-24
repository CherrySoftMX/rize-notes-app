import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigation } from '@molecules/BottomTopNavigation';
import { SearchBar } from '@molecules/SearchBar';
import { MenuProvider } from 'react-native-popup-menu';
import { MultiActionFloatButton } from '@molecules/MultiActionFloatButton';
import { ScreenProvider } from './src/library/context/ScreenContext';

const App = () => {
  return (
    <MenuProvider>
      <NavigationContainer>
        <ScreenProvider>
          <SearchBar />
          <BottomTabNavigation />
          <MultiActionFloatButton />
        </ScreenProvider>
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;
