import React, { useState } from 'react';
import { SearchBar } from '@molecules/SearchBar';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { AntiquityFilterOptionsList } from '@molecules/AntiquityFilterOptionsList';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FolderList } from '@organisms/FolderList/FolderList';
import { NoteForm } from '@organisms/NoteForm';

export const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const { colors } = useTheme();

  return (
    <SafeAreaView>
      <FolderList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <View style={{ backgroundColor: colors.background }}>
            <ScreenTitle label="My notes" />
            <SearchBar />
            <AntiquityFilterOptionsList />
          </View>
        }
      />
      <NoteForm showModal={showModal} closeModal={setShowModal} />
    </SafeAreaView>
  );
};
