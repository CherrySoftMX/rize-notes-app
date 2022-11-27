import React, { useEffect, useState } from 'react';
import { FolderDetails } from '@organisms/FolderDetails';
import { NoteList } from '@organisms/NoteList/NoteList';
import { VStack } from '@react-native-material/core';
import { styles } from './SearchScreen.style';
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
import { deleteNoteById, filterNotesByContent } from '../../library/services/NotesService';
import { AntiquityFilterOptionsList } from '@molecules/AntiquityFilterOptionsList';

type SearchRouteProp = RouteProp<RootStackParamList, 'Search'>;
type SearchScreenParams = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

export const SearchScreen = () => {
  const navigation = useNavigation<SearchScreenParams>();
  const route = useRoute<SearchRouteProp>();

  const [query, setQuery] = useState('');
  const [lastQuery, setLastQuery] = useState('');


  const [notes, setNotes] = useState([] as Array<Note>);

  useEffect(()=>{
    setQuery(route.params.query);
    setLastQuery(route.params.query);
    setNotes(route.params.notes);
  }, [])


  const onSearch = async () => {
    const foundNotes = await filterNotesByContent(query);
    setNotes(foundNotes);
    setLastQuery(query);
  }

   const onDeleteNote = async (noteId: string) => {
    const deletedNote = await deleteNoteById(noteId, true);
    if (!deletedNote) {
      return;
    }
    const updatedNotes = notes.filter(
      note => note.id !== deletedNote.id,
    );

    setNotes(updatedNotes);
   }
  return (
    <SafeAreaView>
      <NoteList
        ListHeaderComponent={
          <ScreenHeader title="Search" handleClick={onSearch} setQuery={setQuery}>
            <VStack spacing={spacing.sm}>
              <AntiquityFilterOptionsList />
              <View>
                <Text style={styles.sectionTitle}>{'results from: ' + lastQuery}</Text>
              </View>
            </VStack>
          </ScreenHeader>
        }
        notes={notes}
        handleClick={() => {}}
        handleDelete={onDeleteNote}
      />
    </SafeAreaView>
  );
};
