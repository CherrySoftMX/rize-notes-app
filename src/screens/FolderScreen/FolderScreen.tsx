import React, { useEffect, useState } from 'react';
import { colors } from '../../design/tokens';
import { FolderDetails } from '@organisms/FolderDetails';
import { NoteList } from '@organisms/NoteList/NoteList';
import { VStack } from '@react-native-material/core';
import { styles } from './FolderScreen.style';
import { Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@screens/RootStackParams';
import { FolderInterface } from '../../library/interfaces/FolderInterface';
import { getFolderById } from '../../library/services/FoldersService';
import { NoteInterface } from 'library/interfaces/NoteInterface';

type FolderScreenProp = NativeStackNavigationProp<RootStackParamList, 'Folder'>;
type FolderRouteProp = RouteProp<RootStackParamList, 'Folder'>;

export const FolderScreen = () => {
  const navigation = useNavigation<FolderScreenProp>();
  const route = useRoute<FolderRouteProp>();
  const [folder, setFolder] = useState({} as FolderInterface);

  useEffect(() => {
    const fetchFolder = async () => {
      const receivedFolder = await getFolderById(route.params.folderId, true);
      setFolder(receivedFolder);
    };
    fetchFolder();
  }, [route.params.folderId]);

  return (
    <VStack fill>
      <FolderDetails {...folder} />
      <Text style={styles.sectionTitle}>Notes</Text>
      <NoteList
        notes={folder.notes as unknown as Array<NoteInterface>}
        handleClick={() => {}}
      />
    </VStack>
  );
};
