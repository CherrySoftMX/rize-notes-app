import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@screens/RootStackParams';

type NoteRouteProp = RouteProp<RootStackParamList, 'Note'>;

export const NoteScreen = () => {
  const route = useRoute<NoteRouteProp>();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Note ID: {route.params.noteId}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
});
