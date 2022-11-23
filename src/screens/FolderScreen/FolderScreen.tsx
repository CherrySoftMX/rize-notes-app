import React, { useEffect, useState } from 'react';
import { FolderDetails } from '@organisms/FolderDetails';
import { NoteList } from '@organisms/NoteList/NoteList';
import { VStack } from '@react-native-material/core';
import { styles } from './FolderScreen.style';
import { Text, View } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@screens/RootStackParams';
import { FolderWithNotes } from '../../library/interfaces/Folder';
import {
  getFolderAndNotesById,
  editFolder,
  deleteFolderById,
} from '../../library/services/FoldersService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Note } from 'library/interfaces/Note';
import { ScreenHeader } from '@organisms/ScreenHeader';
import { spacing } from '../../design/tokens';
import { Folder } from '../../library/interfaces/Folder';
import { useSetRecoilState } from 'recoil';
import { foldersState } from '../../library/state/foldersState';
import { FolderForm } from '@organisms/FolderForm/FolderForm';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { deleteNoteById } from '../../library/services/NotesService';

type FolderRouteProp = RouteProp<RootStackParamList, 'Folder'>;
type FolderScreenParams = NativeStackNavigationProp<
  RootStackParamList,
  'Folder'
>;

export const FolderScreen = () => {
  const navigation = useNavigation<FolderScreenParams>();
  const route = useRoute<FolderRouteProp>();
  const setFoldersState = useSetRecoilState(foldersState);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folderWithNotes, setFolderWithNotes] = useState<FolderWithNotes>({
    notes: [] as Array<Note>,
  } as FolderWithNotes);

  useEffect(() => {
    getFolderAndNotesById(route.params.folderId).then(result => {
      if (result) {
        setFolderWithNotes(result);
      }
    });
  }, [route.params.folderId]);

  const onOpenEditModal = () => {
    setShowFolderModal(!showFolderModal);
  };

  const onCloseFolderModal = (showModal: boolean) => {
    setShowFolderModal(showModal);
  };

  const onEditFolder = (folderRequest: Folder) => {
    setFolderWithNotes({ ...folderWithNotes, ...folderRequest });
    editFolder(folderRequest);
    setFoldersState((previousState: Array<Folder>) => {
      const _folders: Array<Folder> = previousState.map((folder: Folder) => {
        if (folder.id === folderRequest.id) {
          return folderRequest;
        } else {
          return folder;
        }
      });
      return [..._folders];
    });
  };

  const onDeleteFolder = async (folderId: string) => {
    await deleteFolderById(folderId);
    setFoldersState(previousState =>
      previousState.filter(f => f.id !== folderId),
    );
    navigation.goBack();
  };

  const onDeleteNote = async (noteId: string) => {
    const deletedNote = await deleteNoteById(noteId, true);
    if (!deletedNote) {
      return;
    }
    const notes = folderWithNotes.notes.filter(
      note => note.id !== deletedNote.id,
    );
    const editedFolder: FolderWithNotes = { ...folderWithNotes, notes };
    setFolderWithNotes(editedFolder);
    setFoldersState(previousState =>
      previousState.map(folder => {
        if (folder.id === editedFolder.id) {
          const notesReferences = folder.noteIds.filter(id => id !== noteId);
          const newFolderState: Folder = {
            id: editedFolder.id,
            userId: editedFolder.userId,
            name: editedFolder.name,
            color: editedFolder.color,
            isLimited: editedFolder.isLimited,
            limit: editedFolder.limit,
            noteIds: notesReferences,
          };
          return newFolderState;
        } else {
          return folder;
        }
      }),
    );
  };

  return (
    <SafeAreaView>
      <NoteList
        ListHeaderComponent={
          <ScreenHeader title="Folder">
            <VStack spacing={spacing.sm}>
              <View>
                <FolderDetails
                  {...folderWithNotes}
                  noteCount={folderWithNotes?.notes.length || 0}
                  handleEdit={onOpenEditModal}
                  handleDelete={onDeleteFolder}
                />
              </View>
              <View>
                <Text style={styles.sectionTitle}>Notes</Text>
              </View>
            </VStack>
          </ScreenHeader>
        }
        notes={folderWithNotes?.notes || []}
        handleClick={() => {}}
        handleDelete={onDeleteNote}
      />
      <FolderForm
        showModal={showFolderModal}
        closeModal={onCloseFolderModal}
        onCreate={() => {}}
        onEdit={onEditFolder}
        folder={folderWithNotes as any as Folder}
      />
    </SafeAreaView>
  );
};
