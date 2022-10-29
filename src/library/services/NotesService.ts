import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export interface ProvisionalNoteInterface {
  user?: string;
  name: string;
  content: string;
  folder: string;
  isFavorite: boolean;
  isLink: boolean;
  image?: string;
  categories?: Array<String>;
}

export const createNewNote = async (noteData: ProvisionalNoteInterface) => {
  const response: any = await AsyncStorage.getItem('userId');
  const userId = await JSON.parse(response);

  firestore()
    .collection('notes')
    .add({
      ...noteData,
      id: uuid.v4(),
      image: '',
      user: userId,
      categories: [''],
    })
    .then(() => console.log('Subida terminada'))
    .catch((err: any) => {
      console.log(err);
      console.log('Error al subir la nota');
    });
};

export const getNotes = async () => {
  const response: any = await AsyncStorage.getItem('userId');
  const userId = await JSON.parse(response);

  const notes = await firestore()
    .collection('notes')
    .where('user', '==', userId)
    .get();
  console.log('Obtenido:');
  console.log(notes._docs);
  if (notes._docs) {
    return notes._docs.map((doc: any) => doc._data);
  } else {
    return [];
  }
};
