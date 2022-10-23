import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigation } from '@molecules/BottomTopNavigation';
import { SearchBar } from '@molecules/SearchBar';
import { MenuProvider } from 'react-native-popup-menu';

const App = () => {
  return (
    <MenuProvider>
      <NavigationContainer>
        <SearchBar />
        <BottomTabNavigation />
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;
