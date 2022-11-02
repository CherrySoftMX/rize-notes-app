import React from 'react';
import { Folder } from '@organisms/Folder/Folder';
import { styles } from './FolderList.style';
import FOLDER from '../../../library/services/Folders.json';
import MasonryList from '@react-native-seoul/masonry-list';

export const FolderList = ({ ...rest }: any) => {
  return (
    <MasonryList
      {...rest}
      data={rest.folders || FOLDER.folders}
      numColumns={2}
      renderItem={({ item }) => <Folder {...item} />}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      containerStyle={styles.list}
    />
  );
};
