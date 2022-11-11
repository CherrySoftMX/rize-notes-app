import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigation } from '@molecules/BottomTopNavigation';
import { MenuProvider } from 'react-native-popup-menu';
import { ScreenProvider } from './src/library/context/ScreenContext';
import auth from '@react-native-firebase/auth';
import { Text } from 'react-native';
import { useAuth } from '@hooks/useAuth';
import { Else, If, Then } from 'react-if';

const App = () => {
  const { user, startAuth } = useAuth();
  useEffect(() => {
    return auth().onAuthStateChanged(startAuth);
  }, [startAuth]);

  return (
    <MenuProvider>
      <NavigationContainer>
        <ScreenProvider>
          <If condition={user}>
            <Then>
              <BottomTabNavigation />
            </Then>
            <Else>
              <Text>Loading...</Text>
            </Else>
          </If>
        </ScreenProvider>
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;
