import React from 'react';
import { View, Text } from 'react-native';
import { Ghost } from 'react-kawaii/lib/native/';
import { spacing } from '../../../design/tokens';
import { Flex, Surface, VStack } from '@react-native-material/core';
import { styles } from './ComingSoonPlaceholder.style';

interface ComingSoonPlaceholderProps {
  content?: string;
}

export const ComingSoonPlaceholder = ({
  content,
}: ComingSoonPlaceholderProps) => {
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
        {content && <Text style={styles.content}>{content}</Text>}
      </VStack>
    </Flex>
  );
};
