import * as React from 'react';
import { View, Text } from 'react-native';
import { Flex, VStack, Button } from '@react-native-material/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing } from '../../design/tokens';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootStackParams';
import { auth } from '../../library/services/AuthService';
import { When } from 'react-if';
import { useRecoilValue } from 'recoil';
import { userState } from '../../library/state/userState';

type HomeScreenParams = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>;

export const SettingsScreen = () => {
  const navigation = useNavigation<HomeScreenParams>();
  const user = useRecoilValue(userState);

  const onGoRegister = () => {
    navigation.navigate('Register');
  };

  const onLogout = () => {
    auth.logout();
  };

  return (
    <SafeAreaView>
      <View>
        <Text>User ID: {user.id}</Text>
        <Text>Is logged in: {user.isLogged ? 'Yes' : 'No'}</Text>
        <When condition={user.isLogged}>
          <Text>Email: {user.email}</Text>
        </When>
      </View>
      <Flex center style={{ height: '100%' }}>
        <VStack spacing={spacing.lg}>
          <Button title="Register" onPress={onGoRegister} />
          <Button title="Login" />
          <Button title="Log out" onPress={onLogout} />
        </VStack>
      </Flex>
    </SafeAreaView>
  );
};
