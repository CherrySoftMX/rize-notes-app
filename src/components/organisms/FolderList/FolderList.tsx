import React from 'react';
import { Folder } from '@organisms/Folder/Folder';
import { FlatList, View } from 'react-native';
import { styles } from './FolderList.style';
import FOLDER from '../../../library/services/Folders.json';

export const FolderList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={FOLDER.notes}
        numColumns={2}
        renderItem={({ item }) => <Folder {...item} />}
        keyExtractor={item => item.id}
        style={styles.listItem}
      />
    </View>
  );
};
