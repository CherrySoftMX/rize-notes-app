import React from 'react';
import { Folder } from '@organisms/Folder/Folder';
import { FlatList } from 'react-native';
import { styles } from './FolderList.style';
import FOLDER from '../../../library/services/Folders.json';

export const FolderList = ({ ...rest }: any) => {
  return (
    <FlatList
      {...rest}
      stickyHeaderIndices={[0]}
      data={rest.folders || FOLDER.folders}
      numColumns={2}
      renderItem={({ item }) => <Folder {...item} />}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      style={styles.list}
    />
  );
};
