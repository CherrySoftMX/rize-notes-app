import React from 'react';
import { FolderDetails } from '@organisms/FolderDetails';
import { NoteList } from '@organisms/NoteList/NoteList';
import { useBoolean, VStack } from '@react-native-material/core';
import { styles } from './FolderScreen.style';
import { Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@screens/RootStackParams';
import { Folder } from '../../library/interfaces/Folder';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@organisms/ScreenHeader';
import { spacing } from '../../design/tokens';
import { FolderForm } from '@organisms/FolderForm/FolderForm';
import { useFolders } from '@hooks/useFolder';
import { useNotes } from '@hooks/useNotes';
import { ScreenWrapper } from '@atoms/ScreenWrapper';

type FolderRouteProp = RouteProp<RootStackParamList, 'Folder'>;

export const FolderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<FolderRouteProp>();
  const [showFolderModal, setShowFolderModal] = useBoolean(false);
  const { handleEditFolder, handleDeleteFolder } = useFolders();
  const { folderWithNotes, setFolderWithNotes, handleDeleteNote } = useNotes(
    route.params.folderId,
  );

  const onEditFolder = async (editedFolder: Folder) => {
    setFolderWithNotes({ ...folderWithNotes, ...editedFolder });
    await handleEditFolder(editedFolder);
  };

  const onDeleteFolder = async (folderId: string) => {
    await handleDeleteFolder(folderId);
    navigation.goBack();
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
                    handleEdit={setShowFolderModal.on}
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
          onDeleteNote={handleDeleteNote}
        />
        <FolderForm
          folder={folderWithNotes as any as Folder}
          onEdit={onEditFolder}
          showModal={showFolderModal}
          closeModal={setShowFolderModal.toggle}
        />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
