import React from 'react';
import { View, Text } from 'react-native';
import { spacing } from '../../../design/tokens';
import { HStack } from '@react-native-material/core';
import { styles } from './LabelWithCircle.style';

interface LabelWithCircleProps {
  label: string;
  color: string;
}

export const LabelWithCircle = ({
  label = '',
  color,
}: LabelWithCircleProps) => {
  return (
    <HStack spacing={spacing.xm}>
      <View style={[styles.circle, { backgroundColor: color }]} />
      <Text>{label}</Text>
    </HStack>
  );
};
