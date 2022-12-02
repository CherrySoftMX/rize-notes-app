import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FolderList } from '@organisms/FolderList/FolderList';
import { NoteForm } from '@organisms/NoteForm';
import { FolderForm } from '@organisms/FolderForm/FolderForm';
import { Folder } from '../../library/interfaces/Folder';
import { MultiActionFloatButton } from '@molecules/MultiActionFloatButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootStackParams';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@organisms/ScreenHeader';
import { useFolders } from '@hooks/useFolder';
import SplashScreen from 'react-native-splash-screen';
import { useNotes } from '@hooks/useNotes';
import { ScreenWrapper } from '@atoms/ScreenWrapper';

type HomeScreenParams = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenParams>();
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folderToEdit, setFolderToEdit] = useState<Folder | undefined>();
  const { folders, handleCreateFolder, handleEditFolder, handleDeleteFolder } =
    useFolders();
  const { handleCreateNote } = useNotes();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const navigateToFolder = (folderId: string) => {
    navigation.navigate('Folder', { folderId });
  };

  const openNotesForm = async () => {
    setShowNotesModal(true);
  };

  const onSelectFolderToEdit = (folder: Folder) => {
    setFolderToEdit(folder);
    setShowFolderModal(!showFolderModal);
  };

  const onCloseFolderModal = () => {
    setShowFolderModal(false);
    setFolderToEdit(undefined);
  };

  const onEditFolder = async (folderRequest: Folder) => {
    await handleEditFolder(folderRequest);
    setFolderToEdit(undefined);
  };

  return (
    <SafeAreaView>
      <ScreenWrapper>
        <FolderList
          ListHeaderComponent={
            <ScreenHeader title="My notes" showAntiquityFilterOptions={true} />
          }
          folders={folders}
          handleClick={navigateToFolder}
          handleEdit={onSelectFolderToEdit}
          handleDelete={handleDeleteFolder}
        />
        <MultiActionFloatButton
          onNotePress={() => openNotesForm()}
          onFolderPress={() => setShowFolderModal(!showFolderModal)}
        />
        <NoteForm
          folders={folders}
          handleCreateNote={handleCreateNote}
          showModal={showNotesModal}
          closeModal={setShowNotesModal}
        />
        <FolderForm
          folder={folderToEdit}
          onCreate={handleCreateFolder}
          onEdit={onEditFolder}
          showModal={showFolderModal}
          closeModal={onCloseFolderModal}
        />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
