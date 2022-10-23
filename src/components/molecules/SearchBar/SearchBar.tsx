import React from 'react';
import { HStack } from '@react-native-material/core';
import { colors } from '../../../design/tokens';
import { Alert, Text, TextInput } from 'react-native';
import { styles } from '@molecules/SearchBar/SearchBar.style';
import { IoniconButton } from '@atoms/IoniconButton';
import { IconButtonPopupMenu } from '@molecules/IconButtonContextMenu';
import { MenuOption } from 'react-native-popup-menu';

export const SearchBar = () => {
  return (
    <HStack style={{ margin: 5 }}>
      <IconButtonPopupMenu
        style={styles.leadingFilterButton}
        iconName="filter-sharp"
        iconColor={colors.pureWhite}>
        <MenuOption disabled={true}>
          <Text style={{ color: colors.eerieBlack }}>Filter by:</Text>
        </MenuOption>
        <MenuOption onSelect={() => Alert.alert('Link')} text="Link" />
        <MenuOption onSelect={() => Alert.alert('URL')} text="URL" />
      </IconButtonPopupMenu>
      <TextInput placeholder="Search" style={styles.textInput} />
      <IoniconButton
        style={styles.trailingSearchButton}
        iconName="search-sharp"
      />
    </HStack>
  );
};
