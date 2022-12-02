import React from 'react';
import { FolderCard } from '@organisms/FolderCard/FolderCard';
import { styles } from './FolderList.style';
import MasonryList from '@react-native-seoul/masonry-list';
import { Folder } from '../../../library/interfaces/Folder';

interface FolderListProps {
  ListHeaderComponent?: React.ReactNode | null;
  handleClick: (e: any) => void;
  handleDelete: (id: string) => void;
  handleEdit: (arg: Folder) => void;
  folders: Folder[];
}

export const FolderList = ({
  handleClick,
  handleDelete,
  handleEdit,
  ...rest
}: FolderListProps) => {
  return (
    <MasonryList
      {...rest}
      numColumns={2}
      data={rest.folders}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, i }) => (
        <FolderCard
          folder={item as Folder}
          handleClick={handleClick}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          style={i % 2 === 0 ? { marginRight: 10 } : { marginLeft: 10 }}
        />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      containerStyle={styles.list}
    />
  );
};
