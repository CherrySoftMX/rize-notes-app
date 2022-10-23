import React from 'react';
import { Box, Flex } from '@react-native-material/core';
import { Text } from 'react-native';
import { colors } from '../../../design/tokens/colors';
import { styles } from './ProgressBar.style';

interface ProgressBarProps {
  completed: number;
}

const TOTAL_NOTES = 50;

export const ProgressBar = ({ completed }: ProgressBarProps) => {
  return (
    <Flex fill m={10} items="center" w={120}>
      <Box h={10} w="100%" bg={colors.black} style={styles.br}>
        <Box
          h={10}
          w={`${completed}%`}
          bg={colors.darkGreen}
          style={styles.br}
        />
      </Box>
      <Box>
        <Text>{`${completed}/${TOTAL_NOTES}`}</Text>
      </Box>
    </Flex>
  );
};
