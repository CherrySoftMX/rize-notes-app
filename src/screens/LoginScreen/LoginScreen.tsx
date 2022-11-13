import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../design/tokens/colors';
import {
  Flex,
  Surface,
  VStack,
  TextInput,
  Button,
  IconButton,
} from '@react-native-material/core';
import { spacing } from '../../design/tokens/spacing';
import { MenuLabel } from '@atoms/MenuLabel';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from './LoginScreen.styles';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * The login screen
 */
export const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <SafeAreaView>
      <Flex style={styles.background} center>
        <Surface elevation={4} style={styles.container}>
          <Flex items="center">
            <Text style={styles.title1}>Hello</Text>
            <Text style={styles.title2}>Sign into your account</Text>
            <VStack spacing={spacing.sm} style={styles.stack}>
              <View>
                <MenuLabel>Email</MenuLabel>
                <TextInput
                  inputContainerStyle={styles.input}
                  placeholder="Type your email"
                  variant="standard"
                  trailing={props => (
                    <Icon name="mail" {...props} color={colors.primary} />
                  )}
                />
              </View>
              <View>
                <MenuLabel>Password</MenuLabel>
                <TextInput
                  inputContainerStyle={styles.input}
                  placeholder="Type your password"
                  variant="standard"
                  secureTextEntry={!showPassword}
                  trailing={props => (
                    <IconButton
                      icon={propsIcon => (
                        <Icon
                          name={showPassword ? 'eye' : 'eye-off'}
                          {...propsIcon}
                          color={colors.primary}
                        />
                      )}
                      onPress={() => setShowPassword(!showPassword)}
                      {...props}
                    />
                  )}
                />
              </View>
              <Button
                title="Login"
                uppercase={false}
                color={colors.primary}
                tintColor="#FEFEFE"
                style={styles.buttonLogin}
              />
              <Text style={styles.label}>Or login using social media</Text>
              <Button
                title="Google"
                uppercase={false}
                variant="outlined"
                color={colors.eerieBlack}
                style={styles.buttonLogin}
                leading={props => <Icon name="logo-google" {...props} />}
              />
            </VStack>
          </Flex>
        </Surface>
      </Flex>
    </SafeAreaView>
  );
};
