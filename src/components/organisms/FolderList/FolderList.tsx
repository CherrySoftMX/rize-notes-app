import React from 'react';
import { Folder } from '@organisms/Folder/Folder';
import { FlatList, FlatListProps } from 'react-native';
import { styles } from './FolderList.style';
import FOLDER from '../../../library/services/Folders.json';

export const FolderList = ({ ...rest }: Partial<FlatListProps<any>>) => {
  return (
    <FlatList
      {...rest}
      data={FOLDER.folders}
      numColumns={2}
      renderItem={({ item }) => <Folder {...item} />}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};
