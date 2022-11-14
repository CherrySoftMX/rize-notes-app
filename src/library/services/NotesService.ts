import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import { auth } from './AuthService';
import { CreateNoteRequest, Note } from '../interfaces/Note';

/**
 * Inserts a new note in the database.
 *
 * @param noteRequest - A note.
 *
 * @beta
 */
export const createNote = (noteRequest: CreateNoteRequest): Note => {
  const userId = auth.getCurrentUserId();
  const noteId = uuid.v4() as string;

  const newNote: Note = {
    ...noteRequest,
    id: `${noteId}`,
    image: '',
    userId: userId,
    categories: [],
  };

  firestore()
    .collection('notes')
    .doc(noteId)
    .set(newNote)
    .catch((err: any) => console.log(err));

  firestore()
    .collection('folders')
    .doc(noteRequest.folderId)
    .update({
      noteIds: firestore.FieldValue.arrayUnion(noteId),
    })
    .catch((err: any) => console.log(err));

  return newNote;
};

/**
 * Gets all the notes in database of the current app user.
 *
 * @returns An array of {@Link NoteInterface}.
 *
 * @beta
 */
export const getNotes = async (): Promise<Note[]> => {
  const userId = auth.getCurrentUserId();

  const notes = await firestore()
    .collection('notes')
    .where('userId', '==', userId)
    .get();

  if (notes.docs) {
    return notes.docs.map((doc: any) => doc._data);
  } else {
    return [];
  }
};

/**
 * Gets a note by its id.
 *
 * @param noteId - The id of a note.
 * @returns An object of type {@Link NoteInterface}.
 */
export const getNoteById = async (noteId: string): Promise<Note | null> => {
  const note = (await firestore()
    .collection('notes')
    .doc(noteId)
    .get()
    .catch((err: any) => console.log(err))) as any;

  if (note._exists) {
    return note._data as Note;
  } else {
    return null;
  }
};

/**
 * Deletes a note by id.
 *
 * @param noteId - The id of the note to delete.
 * @returns The deleted {@Link Note} object.
 */
export const deleteNoteById = async (noteId: string) => {
  const deletedNote = await getNoteById(noteId);
  await firestore().collection('notes').doc(noteId).delete();
  return deletedNote;
};
