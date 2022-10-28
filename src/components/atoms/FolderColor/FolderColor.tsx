import React from 'react';
import { Box } from '@react-native-material/core';
import { styles } from './FolderColor.style';

interface FolderColorProps {
  hexColor: string;
  isSelected: boolean;
}

export const Foldercolor = ({ hexColor, isSelected }: FolderColorProps) => {
  return (
    <Box
      w={32}
      h={32}
      style={[
        { backgroundColor: hexColor },
        isSelected ? styles.bw5 : styles.bw,
      ]}
    />
  );
};
