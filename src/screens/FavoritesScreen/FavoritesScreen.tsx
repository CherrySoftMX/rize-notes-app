import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NoteList } from '@organisms/NoteList';
import { useRecoilValue } from 'recoil';
import { favoriteNotes } from '../../library/state/favoritesState';
import { Alert, Text, View } from 'react-native';
import { ScreenHeader } from '@organisms/ScreenHeader';
import { VStack } from '@react-native-material/core';
import { FolderDetails } from '@organisms/FolderDetails';
import { styles } from '../FolderScreen/FolderScreen.style';
import { spacing } from '../../design/tokens';
import { ScreenWrapper } from '@atoms/ScreenWrapper';

export const FavoritesScreen = () => {
  const { favorites, favoritesFolder } = useRecoilValue(favoriteNotes);

  return (
    <SafeAreaView>
      <ScreenWrapper>
        <NoteList
          ListHeaderComponent={
            <ScreenHeader
              title="Folder"
              handleClick={() => {}}
              setQuery={() => {}}>
              <VStack spacing={spacing.sm}>
                <View>
                  <FolderDetails
                    {...favoritesFolder}
                    noteCount={favorites.length || 0}
                    handleEdit={() => Alert.alert("Can't edit this folder")}
                    handleDelete={() => Alert.alert("Can't delete this folder")}
                  />
                </View>
                <View>
                  <Text style={styles.sectionTitle}>Notes</Text>
                </View>
              </VStack>
            </ScreenHeader>
          }
          notes={favorites}
          handleClick={() => {}}
          handleDelete={() => Alert.alert("Can't delete notes in this folder")}
        />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
