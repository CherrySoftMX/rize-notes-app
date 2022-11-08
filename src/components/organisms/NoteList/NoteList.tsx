import React from 'react';
import { FlatList } from 'react-native';
import { Note } from '@organisms/Note/';
import { NoteInterface } from '../../../library/interfaces/NoteInterface';

interface NoteListProps {
  handleClick: (id: string) => void;
  notes: Array<NoteInterface>;
}

export const NoteList = ({ handleClick, notes }: NoteListProps) => {
  return (
    <FlatList
      data={notes}
      renderItem={({ item }) => <Note {...item} />}
      keyExtractor={item => item.id}
    />
  );
};
