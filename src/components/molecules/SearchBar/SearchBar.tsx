import React from 'react';
import { Flex } from '@react-native-material/core';
import { colors } from '../../../design/tokens';
import { Alert, Text, TextInput, View } from 'react-native';
import { styles } from '@molecules/SearchBar/SearchBar.style';
import { IoniconButton } from '@atoms/IoniconButton';
import { IconButtonPopupMenu } from '@molecules/IconButtonPopupMenu';
import { MenuOption } from 'react-native-popup-menu';
import { fontSize } from '../../../design/tokens';
import { CardContainer } from '@atoms/CardContainer';

interface SearchBarProps {
  mHorizontal?: number;
  handleClick: (e: any) => void;
  setQuery: (text: string) => void;
}

export const SearchBar = ({ handleClick, setQuery }: SearchBarProps) => {
  return (
    <CardContainer>
      <Flex direction="row" style={styles.container}>
        <SearchByNoteTypeButton />
        <TextInput
          placeholder="Search"
          style={styles.textInput}
          onChangeText={text => setQuery(text)}
        />
        <IoniconButton
          onPress={handleClick}
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
      <MenuOption onSelect={() => Alert.alert('URL')} text="URL" />
    </IconButtonPopupMenu>
  );
};
