import React from 'react';
import { Folder } from '@organisms/Folder/Folder';
import { FlatList } from 'react-native';
import FOLDER from '../../../library/services/Folders.json';
import { Flex } from '@react-native-material/core';

export const FolderList = () => {
  return (
    <Flex direction="column" wrap>
      <FlatList
        data={FOLDER.notes}
        renderItem={({ item }) => <Folder {...item} />}
        keyExtractor={item => item.id}
      />
    </Flex>
  );
};
