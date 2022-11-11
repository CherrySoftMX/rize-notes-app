import React from 'react';
import { FlatList } from 'react-native';
import { NoteCard } from '@organisms/NoteCard/';
import { Note } from '../../../library/interfaces/Note';

interface NoteListProps {
  handleClick: (id: string) => void;
  notes: Note[];
}

export const NoteList = ({ handleClick, notes }: NoteListProps) => {
  return (
    <FlatList
      data={notes}
      renderItem={({ item }) => <NoteCard {...item} />}
      keyExtractor={item => item.id}
    />
  );
};
