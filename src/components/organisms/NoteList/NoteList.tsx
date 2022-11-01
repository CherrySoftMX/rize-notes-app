import React from 'react';
import { FlatList } from 'react-native';
import { Note } from '@organisms/Note/Note';
import DATA from '../../../library/services/Notes.json';

export const NoteList = () => {
  return (
    <FlatList
      data={DATA.notes}
      renderItem={({ item }) => <Note {...item} />}
      keyExtractor={item => item.id}
    />
  );
};
