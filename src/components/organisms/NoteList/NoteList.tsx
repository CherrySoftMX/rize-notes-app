import React from 'react';
import { FlatList, View } from 'react-native';
import { Note } from '@organisms/Note/Note';
import DATA from '../../../library/services/Notes.json';

export const NoteList = () => {
  return (
    <View>
      <FlatList
        data={DATA.notes}
        renderItem={({ item }) => <Note {...item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
