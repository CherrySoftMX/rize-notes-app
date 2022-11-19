import React, { useEffect, useState } from 'react';
import { SearchBar } from '@molecules/SearchBar';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { AntiquityFilterOptionsList } from '@molecules/AntiquityFilterOptionsList';
import { View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { FolderList } from '@organisms/FolderList/FolderList';
import { NoteForm } from '@organisms/NoteForm';
import { FolderForm } from '@organisms/FolderForm/FolderForm';
import {
  createFolder,
  getFolders,
  deleteFolderById,
  editFolder,
} from '../../library/services/FoldersService';
import { CreateFolderRequest, Folder } from '../../library/interfaces/Folder';
import { MultiActionFloatButton } from '@molecules/MultiActionFloatButton';
import { VStack } from '@react-native-material/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootStackParams';
import { CreateNoteRequest } from 'library/interfaces/Note';
import { createNote } from '../../library/services/NotesService';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenParams = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<HomeScreenParams>();
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [folderToEdit, setFolderToEdit] = useState<Folder | undefined>(
    undefined,
  );

  useEffect(() => {
    getFolders().then(result => {
      setFolders(result);
      SplashScreen.hide();
    });
  }, []);

  const openNotesForm = async () => {
    setShowNotesModal(true);
  };

  const navigateToFolder = (folderId: string) => {
    navigation.navigate('Folder', { folderId });
  };

  const onSelectFolderToEdit = (folder: Folder) => {
    setFolderToEdit(folder);
    setShowFolderModal(!showFolderModal);
  };

  const onCreateFolder = (folderRequest: CreateFolderRequest) => {
    folders.unshift(createFolder(folderRequest));
  };

  const onCreateNote = (noteRequest: CreateNoteRequest) => {
    const newNote = createNote(noteRequest);
    const noteFolder = folders.filter(f => f.id === noteRequest.folderId)[0];
    noteFolder.noteIds.push(newNote.id);
  };

  const onDeleteFolder = async (folderId: string) => {
    await deleteFolderById(folderId);
    setFolders(folders.filter(f => f.id !== folderId));
  };

  const onEditFolder = async (folderRequest: Folder) => {
    const _folders = folders.map(folder => {
      if (folder.id === folderRequest.id) {
        return folderRequest;
      } else {
        return folder;
      }
    });
    editFolder(folderRequest);
    setFolderToEdit(undefined);
    setFolders([..._folders]);
  };

  const onCloseFolderModal = (showModal: boolean) => {
    setShowFolderModal(showModal);
    setFolderToEdit(undefined);
  };

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
        handleDelete={onDeleteFolder}
        handleEdit={onSelectFolderToEdit}
      />
      <MultiActionFloatButton
        onNotePress={() => openNotesForm()}
        onFolderPress={() => setShowFolderModal(!showFolderModal)}
      />
      <NoteForm
        folders={folders}
        showModal={showNotesModal}
        closeModal={setShowNotesModal}
        handleCreateNote={onCreateNote}
      />
      <FolderForm
        showModal={showFolderModal}
        closeModal={onCloseFolderModal}
        onCreate={onCreateFolder}
        onEdit={onEditFolder}
        folder={folderToEdit}
      />
    </SafeAreaView>
  );
};
