import React, { useEffect, useState } from 'react';
import { FolderDetails } from '@organisms/FolderDetails';
import { NoteList } from '@organisms/NoteList/NoteList';
import { VStack } from '@react-native-material/core';
import { styles } from './FolderScreen.style';
import { Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@screens/RootStackParams';
import { FolderWithNotes } from '../../library/interfaces/Folder';
import { getFolderAndNotesById } from '../../library/services/FoldersService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Note } from 'library/interfaces/Note';
import { ScreenHeader } from '@organisms/ScreenHeader';
import { spacing } from '../../design/tokens';

type FolderRouteProp = RouteProp<RootStackParamList, 'Folder'>;

export const FolderScreen = () => {
  const route = useRoute<FolderRouteProp>();
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
      />
    </SafeAreaView>
  );
};
