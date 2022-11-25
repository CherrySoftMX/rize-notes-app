import * as React from 'react';
import { Flex, VStack, Button } from '@react-native-material/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing } from '../../design/tokens';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootStackParams';
import { auth } from '../../library/services/AuthService';

type HomeScreenParams = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>;

export const SettingsScreen = () => {
  const navigation = useNavigation<HomeScreenParams>();

  const onGoRegister = () => {
    navigation.navigate('Register');
  };

  const onLogout = () => {
    auth.logout();
  };

  return (
    <SafeAreaView>
      <Flex center style={{height: '100%'}}>
        <VStack spacing={spacing.lg}>
          <Button title="Register" onPress={onGoRegister} />
          <Button title="Login" />
          <Button title="Log out" onPress={onLogout} />
        </VStack>
      </Flex>
    </SafeAreaView>
  );
};
