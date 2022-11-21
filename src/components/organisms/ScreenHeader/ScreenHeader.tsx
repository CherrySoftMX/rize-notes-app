import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { SearchBar } from '@molecules/SearchBar';
import { VStack } from '@react-native-material/core';
import { spacing } from '../../../design/tokens';

interface ScreenHeaderProps {
  title?: string;
  mHorizontalSearchBar?: number;
  children: React.ReactChild;
}

export const ScreenHeader = ({
  title = 'Screen Header',
  mHorizontalSearchBar,
  children,
}: ScreenHeaderProps) => {
  return (
    <View style={styles.container}>
      <VStack spacing={spacing.sm}>
        <View>
          <ScreenTitle label={title} />
        </View>
        <View>
          <SearchBar mHorizontal={mHorizontalSearchBar} />
        </View>
        <View>{children}</View>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.sm + 1,
  },
});