import React, { useState, useEffect } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NoteForm } from '@organisms/NoteForm';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState('');
  useEffect(() => {
    const getUser = async () => {
      const response: any = await AsyncStorage.getItem('userId');
      const userId = await JSON.parse(response);
      console.log('Recuperado id en home');
      console.log(userId);
      setUser(userId);
    };
    getUser();
  }, []);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable onPress={() => setShowModal(true)}>
          <Text>Open modal</Text>
          <Text>Usuario: {user || 'No hay ningun usuario'}</Text>
        </Pressable>
      </View>
      <NoteForm showModal={showModal} closeModal={setShowModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
});
