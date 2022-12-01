import React from 'react';
import { SearchBar } from '@molecules/SearchBar';
import { VStack } from '@react-native-material/core';
import { spacing } from '../../../design/tokens';
import { AntiquityFilterOptionsList } from '@molecules/AntiquityFilterOptionsList';
import { When } from 'react-if';
import { useRecoilState } from 'recoil';
import { searchSpecState } from '../../../library/state/searchSpecState';
import { RootStackParamList } from '@screens/RootStackParams';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { AntiquityOption } from '../../../library/constants';

interface SearchFilterNotesPanelProps {
  showAntiquityFilterOptions: boolean;
}

type SearchScreenParams = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

export const SearchFilterNotesPanel = ({
  showAntiquityFilterOptions = false,
}: SearchFilterNotesPanelProps) => {
  const navigation = useNavigation<SearchScreenParams>();
  const [searchSpec, setSearchSpec] = useRecoilState(searchSpecState);

  const onSearch = () => {
    navigation.navigate('Search');
  };

  const onQueryChanged = (query: string) => {
    setSearchSpec(prev => ({ ...prev, query }));
  };

  const onFilterByAntiquityOption = (antiquityOption: AntiquityOption) => {
    setSearchSpec(prev => ({ ...prev, antiquityOption }));
    onSearch();
  };

  return (
    <VStack spacing={spacing.md}>
      <SearchBar
        query={searchSpec.query}
        handleSearch={onSearch}
        onQueryChanged={onQueryChanged}
      />
      <When condition={showAntiquityFilterOptions}>
        <AntiquityFilterOptionsList
          selectedOption={searchSpec.antiquityOption}
          onOptionPressed={onFilterByAntiquityOption}
        />
      </When>
    </VStack>
  );
};
