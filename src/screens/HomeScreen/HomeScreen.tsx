import React, { useEffect, useState } from 'react';
import { AntiquityFilterOptionsList } from '@molecules/AntiquityFilterOptionsList';
import { useNavigation } from '@react-navigation/native';
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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootStackParams';
import { CreateNoteRequest } from 'library/interfaces/Note';
import { createNote } from '../../library/services/NotesService';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@organisms/ScreenHeader';
import { useRecoilState } from 'recoil';
import { foldersState } from '../../library/state/foldersState';

type HomeScreenParams = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenParams>();
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folderToEdit, setFolderToEdit] = useState<Folder | undefined>(
    undefined,
  );
  const [folders, setFolders] = useRecoilState(foldersState);

  useEffect(() => {
    getFolders().then(result => {
      setFolders(result);
      SplashScreen.hide();
    });
  }, [setFolders]);

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
    const newFolder = createFolder(folderRequest);
    setFolders(previousState => [newFolder, ...previousState]);
  };

  const onCreateNote = (noteRequest: CreateNoteRequest) => {
    const newNote = createNote(noteRequest);
    setFolders((previous: Array<Folder>) => {
      const _folders: Array<Folder> = previous.map(folder => {
        if (folder.id === noteRequest.folderId) {
          return { ...folder, noteIds: [...folder.noteIds, newNote.id] };
        } else {
          return folder;
        }
      });
      return [..._folders];
    });
  };

  const onDeleteFolder = async (folderId: string) => {
    await deleteFolderById(folderId);
    setFolders(previousState => previousState.filter(f => f.id !== folderId));
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
          <ScreenHeader title="My notes">
            <AntiquityFilterOptionsList />
          </ScreenHeader>
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
