import React from 'react';
import { Flex } from '@react-native-material/core';
import { colors } from '../../../design/tokens';
import { Alert, Text, TextInput, View } from 'react-native';
import { styles } from '@molecules/SearchBar/SearchBar.style';
import { IoniconButton } from '@atoms/IoniconButton';
import { IconButtonPopupMenu } from '@molecules/IconButtonContextMenu';
import { MenuOption } from 'react-native-popup-menu';
import { fontSize } from '../../../design/tokens';

export const SearchBar = () => {
  /*return (
    <Surface elevation={4} category="medium" style={{ marginHorizontal: 10 }}>
      <Flex direction="row" style={styles.container}>
        <SearchByNoteTypeButton />
        <TextInput placeholder="Search" style={styles.textInput} />
        <IoniconButton
          style={styles.trailingSearchButton}
          iconName="search-sharp"
        />
      </Flex>
    </Surface>
  );*/
  return (
    <View elevation={4} category="medium" style={styles.searchBarShadow}>
      <Flex direction="row" style={styles.container}>
        <SearchByNoteTypeButton />
        <TextInput placeholder="Search" style={styles.textInput} />
        <IoniconButton
          style={styles.trailingSearchButton}
          iconName="search-sharp"
        />
      </Flex>
    </View>
  );
};

const SearchByNoteTypeButton = () => {
  return (
    <IconButtonPopupMenu
      style={styles.leadingFilterButton}
      iconSize={fontSize.md}
      width={fontSize.md}
      height={fontSize.md}
      hAlign="flex-end"
      iconName="options"
      iconColor={colors.pureWhite}>
      <MenuOption disabled={true}>
        <Text style={{ color: colors.eerieBlack }}>Search by:</Text>
      </MenuOption>
      <MenuOption onSelect={() => Alert.alert('Link')} text="Link" />
      <MenuOption onSelect={() => Alert.alert('URL')} text="URL" />
    </IconButtonPopupMenu>
  );
};
