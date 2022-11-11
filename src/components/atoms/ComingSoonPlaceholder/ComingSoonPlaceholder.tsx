import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Ghost } from 'react-kawaii/lib/native/';
import { colors, fontType, fontSize, spacing } from '../../../design/tokens';
import { Flex, Surface, VStack } from '@react-native-material/core';

export const ComingSoonPlaceholder = () => {
  return (
    <Flex style={styles.background} fill center>
      <VStack spacing={spacing.md} center>
        <Surface elevation={4} style={styles.iconCircleBackground}>
          <View style={styles.iconContainer}>
            <Ghost size={245} mood="happy" color="#E0E4E8" />
          </View>
        </Surface>
        <Text style={styles.title}>COMING SOON</Text>
        <Text style={styles.content}>
          We're currently working on this feature.
        </Text>
        <Text style={styles.content}>
          Soon you will be able to see statistics about your notes and folders!
        </Text>
      </VStack>
    </Flex>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#454545',
  },
  iconCircleBackground: {
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius:
      (Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) *
        0.7) /
      2,
  },
  iconContainer: {
    marginTop: Dimensions.get('window').width * -0.08,
  },
  title: {
    fontFamily: fontType.bold,
    fontSize: fontSize.xxl + 5,
    color: colors.pureWhite,
  },
  content: {
    fontFamily: fontType.regular,
    fontSize: fontSize.md + 1,
    color: colors.pureWhite,
    maxWidth: Dimensions.get('window').width * 0.8,
    textAlign: 'center',
  },
});
