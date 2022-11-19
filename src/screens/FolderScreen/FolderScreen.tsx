import React, { useEffect, useState } from 'react';
import { FolderDetails } from '@organisms/FolderDetails';
import { NoteList } from '@organisms/NoteList/NoteList';
import { VStack } from '@react-native-material/core';
import { styles } from './FolderScreen.style';
import { Text, View } from 'react-native';
import { RouteProp, useRoute, useTheme } from '@react-navigation/native';
import { RootStackParamList } from '@screens/RootStackParams';
import { FolderWithNotes } from '../../library/interfaces/Folder';
import { getFolderAndNotesById } from '../../library/services/FoldersService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Note } from 'library/interfaces/Note';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { SearchBar } from '@molecules/SearchBar';

type FolderRouteProp = RouteProp<RootStackParamList, 'Folder'>;

export const FolderScreen = () => {
  const { colors } = useTheme();
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
          <View style={{ backgroundColor: colors.background, paddingTop: 16 }}>
            <VStack spacing={15}>
              <View>
                <ScreenTitle label="Folder" />
              </View>
              <View>
                <SearchBar />
              </View>
              <View>
                <FolderDetails
                  {...folderWithNotes}
                  noteCount={folderWithNotes.notes.length}
                />
              </View>
              <View>
                <Text style={styles.sectionTitle}>Notes</Text>
              </View>
            </VStack>
          </View>
        }
        notes={folderWithNotes?.notes || []}
        handleClick={() => {}}
      />
    </SafeAreaView>
  );
};
