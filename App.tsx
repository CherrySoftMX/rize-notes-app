import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigation } from '@molecules/BottomTopNavigation';
import { SearchBar } from '@molecules/SearchBar';
import { MenuProvider } from 'react-native-popup-menu';
import { MultiActionFloatButton } from '@molecules/MultiActionFloatButton';
import { ScreenProvider } from './src/library/context/ScreenContext';
import auth from '@react-native-firebase/auth';
import { Text } from 'react-native';
import { useAuth } from '@hooks/useAuth';

const App = () => {
  const { user, startAuth } = useAuth();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(startAuth);
    return subscriber;
  }, [startAuth]);

  return (
    <MenuProvider>
      <NavigationContainer>
        <ScreenProvider>
          {user && (
            <>
              <BottomTabNavigation />
            </>
          )}
          {!user && <Text>Cargando...</Text>}
        </ScreenProvider>
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;
