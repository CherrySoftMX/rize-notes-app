import React from 'react';
import { Box, VStack } from '@react-native-material/core';
import { Text } from 'react-native';
import { colors } from '../../../design/tokens/colors';
import { styles } from './ProgressBar.style';

interface ProgressBarProps {
  completed: number;
  size?: number;
}

export const ProgressBar = ({ completed, size = 1 }: ProgressBarProps) => {
  return (
    <VStack items="center">
      <Box h={10} w="100%" bg={colors.black} style={styles.br}>
        <Box
          h={10}
          w={`${(completed / size) * 100}%`}
          bg={colors.darkGreen}
          style={styles.br}
        />
      </Box>
      <Box m={2}>
        <Text
          style={{
            fontSize: 13,
          }}>{`${completed}/${size}`}</Text>
      </Box>
    </VStack>
  );
};
