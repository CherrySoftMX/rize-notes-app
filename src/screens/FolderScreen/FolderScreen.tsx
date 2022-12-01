import React, { useState } from 'react';
import { FolderDetails } from '@organisms/FolderDetails';
import { NoteList } from '@organisms/NoteList/NoteList';
import { VStack } from '@react-native-material/core';
import { styles } from './FolderScreen.style';
import { Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@screens/RootStackParams';
import { Folder } from '../../library/interfaces/Folder';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@organisms/ScreenHeader';
import { spacing } from '../../design/tokens';
import { FolderForm } from '@organisms/FolderForm/FolderForm';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFolders } from '@hooks/useFolder';
import { useNotes } from '@hooks/useNotes';
import { ScreenWrapper } from '@atoms/ScreenWrapper';

type FolderRouteProp = RouteProp<RootStackParamList, 'Folder'>;
type FolderScreenParams = NativeStackNavigationProp<
  RootStackParamList,
  'Folder'
>;
type NoteScreenParams = NativeStackNavigationProp<RootStackParamList, 'Note'>;

export const FolderScreen = () => {
  const folderNavigation = useNavigation<FolderScreenParams>();
  const noteNavigation = useNavigation<NoteScreenParams>();
  const route = useRoute<FolderRouteProp>();
  const [showFolderModal, setShowFolderModal] = useState(false);
  const { handleEditFolder, handleDeleteFolder } = useFolders();
  const { folderWithNotes, setFolderWithNotes, handleDeleteNote } = useNotes(
    route.params.folderId,
  );

  const navigateToNote = (noteId: string) => {
    noteNavigation.navigate('Note', { noteId });
  };

  const onOpenEditModal = () => {
    setShowFolderModal(!showFolderModal);
  };

  const onCloseFolderModal = (showModal: boolean) => {
    setShowFolderModal(showModal);
  };

  const onEditFolder = async (folderReq: Folder) => {
    setFolderWithNotes({ ...folderWithNotes, ...folderReq });
    await handleEditFolder(folderReq);
  };

  const onDeleteFolder = async (folderId: string) => {
    await handleDeleteFolder(folderId);
    folderNavigation.goBack();
  };

  return (
    <SafeAreaView>
      <ScreenWrapper>
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
          onNotePressed={navigateToNote}
          onDeleteNote={handleDeleteNote}
        />
        <FolderForm
          folder={folderWithNotes as any as Folder}
          onCreate={() => {}}
          onEdit={onEditFolder}
          showModal={showFolderModal}
          closeModal={onCloseFolderModal}
        />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
