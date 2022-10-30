import React from 'react';
import { FlatList, View } from 'react-native';
import { Folder } from '@organisms/Folder/Folder';
import { styles } from './FolderList.style';
import DATA from '../../../library/services/Folders.json';

export const FolderList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA.folders}
        numColumns={2}
        renderItem={({ item }) => <Folder {...item} />}
        keyExtractor={item => item.id}
        style={styles.listItem}
      />
    </View>
  );
};
