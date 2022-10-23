import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Flex } from '@react-native-material/core';
import { Note } from '@organisms/Note/Note';
import { styles } from './NoteList.style';
import DATA from '../../../library/services/Notes.json';

export const NoteList = () => {
  return (
    <View>
      <Flex inline ml={10}>
        <Text style={styles.sectionTitle}>Notes</Text>
      </Flex>
      <FlatList
        data={DATA.notes}
        renderItem={({ item }) => <Note {...item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
