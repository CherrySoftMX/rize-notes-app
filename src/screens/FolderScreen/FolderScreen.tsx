import React, { useEffect, useState } from 'react';
import { FolderDetails } from '@organisms/FolderDetails';
import { NoteList } from '@organisms/NoteList/NoteList';
import { VStack } from '@react-native-material/core';
import { styles } from './FolderScreen.style';
import { Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@screens/RootStackParams';
import { FolderWithNotes } from '../../library/interfaces/Folder';
import { getFolderAndNotesById } from '../../library/services/FoldersService';
import { SafeAreaView } from 'react-native-safe-area-context';

type FolderRouteProp = RouteProp<RootStackParamList, 'Folder'>;

export const FolderScreen = () => {
  const route = useRoute<FolderRouteProp>();
  const [folderWithNotes, setFolderWithNotes] = useState<FolderWithNotes>();

  useEffect(() => {
    getFolderAndNotesById(route.params.folderId).then(result => {
      if (result) {
        setFolderWithNotes(result);
      }
    });
  }, [route.params.folderId]);

  return (
    <SafeAreaView>
      <VStack>
        {folderWithNotes && (
          <FolderDetails
            {...folderWithNotes}
            noteCount={folderWithNotes.notes.length}
          />
        )}
        <Text style={styles.sectionTitle}>Notes</Text>
        <NoteList notes={folderWithNotes?.notes || []} handleClick={() => {}} />
      </VStack>
    </SafeAreaView>
  );
};
