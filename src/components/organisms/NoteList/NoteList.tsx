import React from 'react';
import { FlatList } from 'react-native';
import { NoteCard } from '@organisms/NoteCard/';
import { Note } from '../../../library/interfaces/Note';
import { styles } from './NoteList.style';

interface NoteListProps {
  handleClick: (id: string) => void;
  notes: Note[];
  ListHeaderComponent?: React.ReactNode | null;
}

export const NoteList = ({ handleClick, notes, ...rest }: NoteListProps) => {
  return (
    <FlatList
      {...rest}
      data={notes}
      renderItem={({ item }) => <NoteCard {...item} />}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};
