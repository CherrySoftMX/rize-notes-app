import React from 'react';
import { Text } from 'react-native';
import { CardContainer } from '@atoms/CardContainer';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { Flex, VStack } from '@react-native-material/core';
import { spacing } from '../../../design/tokens';

interface DataCardProps {
  label: string;
  value: string | number;
}

export const DataCard = ({ label, value }: DataCardProps) => {
  return (
    <CardContainer style={{ paddingVertical: spacing.lg }}>
      <Flex center>
        <VStack spacing={spacing.tiny}>
          <Text>{label}</Text>
          <ScreenTitle label={value} />
        </VStack>
      </Flex>
    </CardContainer>
  );
};
