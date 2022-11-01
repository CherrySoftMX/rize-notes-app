import React, { useState } from 'react';
import { SearchBar } from '@molecules/SearchBar';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { AntiquityFilterOptionsList } from '@molecules/AntiquityFilterOptionsList';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FolderList } from '@organisms/FolderList/FolderList';
import { NoteForm } from '@organisms/NoteForm';
import { FolderForm } from '@organisms/FolderForm/FolderForm';
import { useAuth } from '@hooks/useAuth';
import { getFolders } from '../../library/services/FoldersService';
import { FolderInterface } from '.././../library/interfaces/FolderInterface';
import { MultiActionFloatButton } from '@molecules/MultiActionFloatButton';

export const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folders, setFolders] = useState([] as Array<FolderInterface>);
  const { user } = useAuth();

  const openNotesForm = async () => {
    const receivedFolders: Array<FolderInterface> = await getFolders();
    setFolders(receivedFolders);
    setShowModal(true);
  };

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
      <MultiActionFloatButton />
      <NoteForm
        showModal={showModal}
        closeModal={setShowModal}
        folders={folders}
      />
      <FolderForm showModal={showFolderModal} closeModal={setShowFolderModal} />
    </SafeAreaView>
  );
};
