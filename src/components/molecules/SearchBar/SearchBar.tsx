import React from 'react';
import { Flex } from '@react-native-material/core';
import { colors, fontSize } from '../../../design/tokens';
import { Alert, Text, TextInput } from 'react-native';
import { styles } from '@molecules/SearchBar/SearchBar.style';
import { IoniconButton } from '@atoms/IoniconButton';
import { IconButtonPopupMenu } from '@molecules/IconButtonPopupMenu';
import { MenuOption } from 'react-native-popup-menu';
import { CardContainer } from '@atoms/CardContainer';

interface SearchBarProps {
  query?: string;
  handleSearch?: (e: any) => void;
  onQueryChanged?: (query: string) => void;
}

export const SearchBar = ({
  query,
  handleSearch,
  onQueryChanged,
}: SearchBarProps) => {
  return (
    <CardContainer>
      <Flex direction="row" style={styles.container}>
        <SearchByNoteTypeButton />
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          value={query}
          onChangeText={onQueryChanged}
        />
        <IoniconButton
          onPress={handleSearch}
          style={styles.trailingSearchButton}
          iconName="search-sharp"
        />
      </Flex>
    </CardContainer>
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
      <MenuOption onSelect={() => Alert.alert('Text')} text="Text" />
    </IconButtonPopupMenu>
  );
};
