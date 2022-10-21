import React from 'react';
import { Image } from 'react-native';

interface FolderIconProps {
  width?: number;
  height?: number;
}

export const FolderIcon = ({ width = 46, height = 39 }: FolderIconProps) => {
  return (
    <Image
      source={require('@assets/icon-folder1.png')}
      style={{ width, height }}
    />
  );
};
