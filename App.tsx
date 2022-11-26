import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigation } from '@molecules/BottomTopNavigation';
import { MenuProvider } from 'react-native-popup-menu';
import { ScreenProvider } from './src/library/context/ScreenContext';
import auth from '@react-native-firebase/auth';
import { Text } from 'react-native';
import { useAuth } from '@hooks/useAuth';
import { Else, If, Then } from 'react-if';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';

const App = () => {
  const { user, startAuth } = useAuth();
  useEffect(() => {
    return auth().onAuthStateChanged(startAuth);
  }, [startAuth]);

  return (
    <SafeAreaProvider>
      <RecoilRoot>
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
      </RecoilRoot>
    </SafeAreaProvider>
  );
};

export default App;
