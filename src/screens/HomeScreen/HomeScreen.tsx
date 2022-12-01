import React, { useEffect, useState } from 'react';
import { AntiquityFilterOptionsList } from '@molecules/AntiquityFilterOptionsList';
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
import { Note } from 'library/interfaces/Note';
import { filterNotesByContent } from '../../library/services/NotesService';
import { ScreenWrapper } from '@atoms/ScreenWrapper';

type HomeScreenParams = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenParams>();
  const [query, setQuery] = useState('');
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

  const onCloseFolderModal = (showModal: boolean) => {
    setShowFolderModal(showModal);
    setFolderToEdit(undefined);
  };

  const onSearch = async () => {
    const notes = await filterNotesByContent(query);
    const indexDate = -1;
    navigation.navigate('Search', { notes, query, indexDate });
  };

  const onEditFolder = async (folderRequest: Folder) => {
    await handleEditFolder(folderRequest);
    setFolderToEdit(undefined);
  };

  const onFilterByAntiquity = (indexDate: number) => {
    const notes: Note[] = [];
    navigation.navigate('Search', { notes, query, indexDate });
  };

  return (
    <SafeAreaView>
      <ScreenWrapper>
        <FolderList
          ListHeaderComponent={
            <ScreenHeader
              title="My notes"
              handleClick={onSearch}
              setQuery={setQuery}>
              <AntiquityFilterOptionsList onClick={onFilterByAntiquity} />
            </ScreenHeader>
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
