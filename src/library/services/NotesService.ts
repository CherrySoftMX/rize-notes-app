import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import { auth } from './AuthService';
import { CreateNoteRequest, Note } from '../interfaces/Note';
import { editFolder, getFolderById } from './FoldersService';
import { SearchSpec } from '../constants/searchSpec';

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

  const currentDate = new Date().toUTCString();
  const newNote: Note = {
    ...noteRequest,
    id: `${noteId}`,
    image: '',
    userId: userId,
    categories: [],
    createAt: currentDate,
    updateAt: currentDate,
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
export const getNotesOfLoggedUser = async (): Promise<Note[]> => {
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

  if (note?._exists) {
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
export const deleteNoteById = async (
  noteId: string,
  deleteFolderReference: boolean,
) => {
  const deletedNote = await getNoteById(noteId);
  if (!deletedNote) {
    return null;
  }
  await firestore().collection('notes').doc(noteId).delete();
  if (deleteFolderReference) {
    const folder = await getFolderById(deletedNote.folderId);
    const noteIds = folder.noteIds.filter(nId => nId !== noteId);
    const editedFolder = { ...folder, noteIds };
    editFolder(editedFolder);
  }
  return deletedNote;
};

/**
 * Returns notes than match the specified {@Link SearchSpec}.
 *
 * @param searchSpec - The specification to match the user notes with.
 */
export const filterNotesBySearchSpec = async (searchSpec: SearchSpec) => {
  const notes = await getNotesCreatedInTheLast(searchSpec.antiquityOption.days);

  return notes.filter(note => {
    const content = note.content.toLowerCase() + ' ' + note.name.toLowerCase();
    return content.includes(searchSpec.query.toLowerCase());
  });
};

/**
 * Returns notes created in the last N days
 *
 * @param days - Past N days
 * @returns An array of {@link Note}.
 */
export const getNotesCreatedInTheLast = async (days: number) => {
  const notes = await getNotesOfLoggedUser();

  if (days === Number.MAX_VALUE) {
    return notes;
  }

  return notes.filter(note => {
    const currentTime = new Date();
    currentTime.setDate(currentTime.getDate() - days);
    const createdAtNote = new Date(note.createAt);
    return createdAtNote.getTime() >= currentTime.getTime();
  });
};

/**
 * Uploads the array of {@Link Note} to firestore with
 * the provided id of the user. This method should only
 * be called if there's an active session.
 *
 * @param newUserId - The new id which will replace the old id.
 * @param notes - An array of {@Link Note}.
 */
export const uploadAndChangeUserOfNotes = async (
  newUserId: string,
  notes: Array<Note>,
) => {
  await Promise.all(
    notes.map(note => {
      firestore()
        .collection('notes')
        .doc(note.id)
        .set({
          ...note,
          userId: newUserId,
        })
        .catch((err: any) => console.log(err));
    }),
  );
};

/**
 * Updates the user id of existing notes.
 *
 * @param newUserId - The new id which will replace the old id.
 * @param notes - An array of {@Link Note}.
 */
export const changeUserOfNotes = (newUserId: string, notes: Array<Note>) => {
  notes.map(note => {
    firestore()
      .collection('notes')
      .doc(note.id)
      .update({ userId: newUserId })
      .catch((err: any) => console.log(err));
  });
};
