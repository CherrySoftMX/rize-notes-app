import React, { useEffect, useState } from 'react';
import { NoteList } from '@organisms/NoteList/NoteList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenHeader } from '@organisms/ScreenHeader';
import { useRecoilValue } from 'recoil';
import { ScreenWrapper } from '@atoms/ScreenWrapper';
import { searchSpecState } from '../../library/state/searchSpecState';
import { Note } from '../../library/interfaces/Note';
import { filterNotesBySearchSpec } from '../../library/services/NotesService';

export const SearchScreen = () => {
  const searchSpec = useRecoilValue(searchSpecState);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    filterNotesBySearchSpec(searchSpec).then(result => setNotes(result));
  }, [searchSpec]);

  return (
    <SafeAreaView>
      <ScreenWrapper>
        <NoteList
          ListHeaderComponent={
            <ScreenHeader title="Search" showAntiquityFilterOptions={true} />
          }
          notes={notes}
        />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
