import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigation } from '@molecules/BottomTopNavigation';
import { SearchBar } from '@molecules/SearchBar';

const App = () => {
  return (
    <NavigationContainer>
      <SearchBar />
      <BottomTabNavigation />
    </NavigationContainer>
  );
};

export default App;
