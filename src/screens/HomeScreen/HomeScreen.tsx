import React, { useState, useEffect } from 'react';
import { SearchBar } from '@molecules/SearchBar';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { AntiquityFilterOptionsList } from '@molecules/AntiquityFilterOptionsList';
import { SafeAreaView, View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FolderList } from '@organisms/FolderList/FolderList';
import { NoteForm } from '@organisms/NoteForm';
import { FolderForm } from '@organisms/FolderForm/FolderForm';
import { getFolders, createNewFolder } from '../../library/services/FoldersService';
import { FolderInterface } from '.././../library/interfaces/FolderInterface';
import { MultiActionFloatButton } from '@molecules/MultiActionFloatButton';

export const HomeScreen = () => {
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folders, setFolders] = useState([] as Array<FolderInterface>);

  const openNotesForm = async () => {
    setShowNotesModal(true);
    getFolders().then(receivedFolders => setFolders(receivedFolders));
  };

  const createFolder = (folder: FolderInterface) => {
    const newFolder: FolderInterface = createNewFolder(folder);
    folders.unshift(newFolder);
  };

  const { colors } = useTheme();

  useEffect(() => {
    const loadFolders = async () => {
      const loadedFolders = await getFolders();
      setFolders(loadedFolders);
    };
    loadFolders();
  }, []);

  return (
    <SafeAreaView>
      <FolderList
        ListHeaderComponent={
          <View style={{ backgroundColor: colors.background, paddingTop: 10 }}>
            <ScreenTitle label="My notes" />
            <SearchBar />
            <AntiquityFilterOptionsList />
          </View>
        }
        folders={folders}
      />
      <MultiActionFloatButton
        onNotePress={() => openNotesForm()}
        onFolderPress={() => setShowFolderModal(!showFolderModal)}
      />
      <NoteForm
        showModal={showNotesModal}
        closeModal={setShowNotesModal}
        folders={folders}
      />
      <FolderForm
        showModal={showFolderModal}
        closeModal={setShowFolderModal}
        onSubmit={createFolder}
      />
    </SafeAreaView>
  );
};
