import React from 'react';
import { FlatList, Text } from 'react-native';
import { NoteCard } from '@organisms/NoteCard/';
import { Note } from '../../../library/interfaces/Note';
import { styles } from './NoteList.style';
import { File } from 'react-kawaii/lib/native/';
import { Flex } from '@react-native-material/core';
import { spacing } from '../../../design/tokens';

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
      ListEmptyComponent={
        <Flex center mt={spacing.md}>
          <File size={205} mood="sad" color="#83D1FB" />
          <Text style={styles.emptyText}>Seems like the folder is empty.</Text>
        </Flex>
      }
    />
  );
};
