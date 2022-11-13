import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigation } from '@molecules/BottomTopNavigation';
import { MenuProvider } from 'react-native-popup-menu';
import { ScreenProvider } from './src/library/context/ScreenContext';
import auth from '@react-native-firebase/auth';
import { Text } from 'react-native';
import { useAuth } from '@hooks/useAuth';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const { user, startAuth } = useAuth();
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(startAuth);
    return subscriber;
  }, [startAuth]);

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
};

export default App;
