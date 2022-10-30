import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { auth } from './AuthService';

/**
 * An interface containing the properties of a Note.
 *
 * @beta
 */
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

/**
 * Inserts a new note in the database.
 *
 * @param noteData - A note.
 *
 * @beta
 */
export const createNewNote = async (noteData: ProvisionalNoteInterface) => {
  const userId = auth.getCurrentUserId();

  firestore()
    .collection('notes')
    .add({
      ...noteData,
      id: uuid.v4(),
      image: '',
      user: userId,
      categories: [''],
    })
    .catch((err: any) => {
      console.log(err);
    });
};

/**
 * Gets all the notes in database of the current app user.
 *
 * @returns An array of {@Link ProvisionalNoteInterface}
 *
 * @beta
 */
export const getNotes = async () => {
  const response: any = await AsyncStorage.getItem('userId');
  const userId = await JSON.parse(response);

  const notes = await firestore()
    .collection('notes')
    .where('user', '==', userId)
    .get();

  if (notes._docs) {
    return notes._docs.map((doc: any) => doc._data);
  } else {
    return [];
  }
};
