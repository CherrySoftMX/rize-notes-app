import React, { useEffect } from 'react';
import firebaseAuth from '@react-native-firebase/auth';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import { ScreenProvider } from './src/library/context/ScreenContext';
import { Else, If, Then } from 'react-if';
import { BottomTabNavigation } from '@molecules/BottomTapNavigation';
import { Text } from 'react-native';
import { useAuth } from '@hooks/useAuth';

export const Loader = () => {
  const { user, startAuth } = useAuth();

  useEffect(() => {
    return firebaseAuth().onAuthStateChanged(startAuth);
  }, []);

  return (
    <MenuProvider>
      <NavigationContainer>
        <ScreenProvider>
          <If condition={user.id !== ''}>
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
