import React from 'react';
import { View } from 'react-native';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { VStack } from '@react-native-material/core';
import { spacing } from '../../../design/tokens';
import { styles } from './ScreenHeader.style';
import { SearchFilterNotesPanel } from '@organisms/SearchFilterNotesPanel';

interface ScreenHeaderProps {
  title: string;
  children?: React.ReactChild;
  showAntiquityFilterOptions?: boolean;
}

export const ScreenHeader = ({
  title,
  children,
  showAntiquityFilterOptions = false,
}: ScreenHeaderProps) => {
  return (
    <View style={styles.container}>
      <VStack spacing={spacing.sm}>
        <ScreenTitle label={title} />
        <SearchFilterNotesPanel {...{ showAntiquityFilterOptions }} />
        <View>{children}</View>
      </VStack>
    </View>
  );
};
