import { FolderList } from '@organisms/FolderList/FolderList';
import { HStack } from '@react-native-material/core';
import React from 'react';

export const StatisticsScreen = () => {
  return (
    <HStack m={4}>
      <FolderList />
    </HStack>
  );
};
