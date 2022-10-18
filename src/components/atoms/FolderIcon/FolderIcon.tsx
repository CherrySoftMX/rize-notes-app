import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface FolderIconProps {
  width?: number;
  height?: number;
}

const FolderIcon = ({width = 46, height = 39}: FolderIconProps) => {
  return (
    <Image
      source={require('../../../../assets/icon-folder1.png')}
      style={{width, height}}
    />
  );
};

export default FolderIcon;
