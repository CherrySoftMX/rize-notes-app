import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import { auth } from './AuthService';
import { NoteInterface } from '../interfaces/NoteInterface';

/**
 * Inserts a new note in the database.
 *
 * @param noteData - A note.
 *
 * @beta
 */
export const createNewNote = async (noteData: NoteInterface) => {
  const userId = auth.getCurrentUserId();
  const noteId = uuid.v4();

  const createdNote: NoteInterface = {
    ...noteData,
    id: `${noteId}`,
    image: '',
    user: userId,
    categories: [],
  };

  firestore()
    .collection('notes')
    .doc(noteId)
    .set(createdNote)
    .catch((err: any) => console.log(err));

  firestore()
    .collection('folders')
    .doc(noteData.folder)
    .update({
      notes: firestore.FieldValue.arrayUnion(noteId),
    })
    .catch((err: any) => console.log(err));

  return createdNote;
};

/**
 * Gets all the notes in database of the current app user.
 *
 * @returns An array of {@Link NoteInterface}.
 *
 * @beta
 */
export const getNotes = async () => {
  const userId = auth.getCurrentUserId();

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

/**
 * Gets a note by its id.
 *
 * @param id - The id of a note.
 * @returns An object of type {@Link Noteinterface}.
 */
export const getNoteById = async (id: string) => {
  const note = await firestore()
    .collection('notes')
    .doc(id)
    .get()
    .catch((err: any) => console.log(err));

  if (note._exists) {
    return note._data;
  } else {
    return {};
  }
};
