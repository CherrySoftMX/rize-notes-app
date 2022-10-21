import React from 'react';
import { HStack } from '@react-native-material/core';
import { colors } from '../../../design/tokens';
import { TextInput } from 'react-native';
import { styles } from '@molecules/SearchBar/SearchBar.style';
import { IoniconButton } from '@atoms/IoniconButton';

export const SearchBar = () => {
  return (
    <HStack style={{ margin: 5 }}>
      <IoniconButton
        style={styles.leadingFilterButton}
        iconName="filter-sharp"
        iconColor={colors.pureWhite}
      />
      <TextInput placeholder="Search" style={styles.textInput} />
      <IoniconButton
        style={styles.trailingSearchButton}
        iconName="search-sharp"
      />
    </HStack>
  );
};
