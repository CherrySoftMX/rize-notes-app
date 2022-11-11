import React from 'react';
import { FolderCard } from '@organisms/FolderCard/FolderCard';
import { styles } from './FolderList.style';
import MasonryList from '@react-native-seoul/masonry-list';
import { Folder } from '../../../library/interfaces/Folder';

interface FolderListProps {
  handleClick: (e: any) => void;
  folders: Folder[];
}

export const FolderList = ({ handleClick, ...rest }: FolderListProps) => {
  return (
    <MasonryList
      {...rest}
      numColumns={2}
      data={rest.folders}
      renderItem={({ item }) => (
        <FolderCard folder={item as Folder} handleClick={handleClick} />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      containerStyle={styles.list}
    />
  );
};
