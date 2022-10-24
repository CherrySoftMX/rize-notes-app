import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import {
  Flex,
  Surface,
  VStack,
  TextInput,
  Button,
  IconButton,
} from '@react-native-material/core';
import { styles } from '../LoginScreen/LoginScreen.styles';
import { spacing } from '../../design/tokens/spacing';
import { MenuLabel } from '@atoms/MenuLabel';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../../design/tokens/colors';

export const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  return (
    <SafeAreaView>
      <Flex style={styles.background} center>
        <Surface elevation={4} style={styles.container}>
          <Flex items="center">
            <Text style={styles.title2}>Create account</Text>
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
              <View>
                <MenuLabel>Confirm password</MenuLabel>
                <TextInput
                  inputContainerStyle={styles.input}
                  placeholder="Confirm your password"
                  variant="standard"
                  secureTextEntry={!showPasswordConfirm}
                  trailing={props => (
                    <IconButton
                      icon={propsIcon => (
                        <Icon
                          name={showPasswordConfirm ? 'eye' : 'eye-off'}
                          {...propsIcon}
                          color={colors.primary}
                        />
                      )}
                      onPress={() =>
                        setShowPasswordConfirm(!showPasswordConfirm)
                      }
                      {...props}
                    />
                  )}
                />
              </View>
              <Button
                title="Register"
                uppercase={false}
                color={colors.primary}
                tintColor="#FEFEFE"
                style={styles.buttonLogin}
              />
              <Text style={styles.label}>Or Register using social media</Text>
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