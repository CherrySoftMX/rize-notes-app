import React from 'react';
import { colors } from '../../design/tokens';
import { FolderDetails } from '@organisms/FolderDetails';
import { NoteList } from '@organisms/NoteList/NoteList';
import { VStack } from '@react-native-material/core';
import { styles } from './FolderScreen.style';
import { Text } from 'react-native';

export const FolderScreen = () => {
  return (
    <VStack fill>
      <FolderDetails
        title="Noticias"
        numberOfNotes={25}
        isProgressBar={true}
        folderColor={colors.yellowishMedium}
      />
      <Text style={styles.sectionTitle}>Notes</Text>
      <NoteList />
    </VStack>
  );
};
