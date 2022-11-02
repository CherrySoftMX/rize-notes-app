import React, { useState, useEffect } from 'react';
import { SearchBar } from '@molecules/SearchBar';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { AntiquityFilterOptionsList } from '@molecules/AntiquityFilterOptionsList';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FolderList } from '@organisms/FolderList/FolderList';
import { NoteForm } from '@organisms/NoteForm';
import { FolderForm } from '@organisms/FolderForm/FolderForm';
import {
  getFolders,
  createNewFolder,
} from '../../library/services/FoldersService';
import { FolderInterface } from '.././../library/interfaces/FolderInterface';
import { MultiActionFloatButton } from '@molecules/MultiActionFloatButton';
import { VStack } from '@react-native-material/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootStackParams';
import { useNavigation } from '@react-navigation/native';

type homeScreenParams = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folders, setFolders] = useState([] as Array<FolderInterface>);
  const navigation = useNavigation<homeScreenParams>();

  const openNotesForm = async () => {
    setShowNotesModal(true);
    getFolders().then(receivedFolders => setFolders(receivedFolders));
  };

  const createFolder = (folder: FolderInterface) => {
    const newFolder: FolderInterface = createNewFolder(folder);
    folders.unshift(newFolder);
  };

  const navigateToFolder = (folderId: string) => {
    console.log('Navegando a: ', folderId);
    navigation.navigate('Folder', { folderId });
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
          <View style={{ backgroundColor: colors.background, paddingTop: 16 }}>
            <VStack spacing={15}>
              <View>
                <ScreenTitle label="My notes" />
              </View>
              <View>
                <SearchBar />
              </View>
              <View>
                <AntiquityFilterOptionsList />
              </View>
            </VStack>
          </View>
        }
        folders={folders}
        handleClick={navigateToFolder}
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
