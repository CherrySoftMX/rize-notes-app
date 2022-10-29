import React from 'react';
import { Box } from '@react-native-material/core';
import { styles } from './FolderColor.style';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface FolderColorProps extends TouchableOpacityProps {
  hexColor: string;
  isSelected: boolean;
}

export const Foldercolor = ({
  hexColor,
  isSelected,
  ...rest
}: FolderColorProps) => {
  return (
    <TouchableOpacity {...rest}>
      <Box
        w={32}
        h={32}
        style={[
          { backgroundColor: hexColor },
          isSelected ? styles.bw1 : styles.withoutBw,
        ]}
      />
    </TouchableOpacity>
  );
};
