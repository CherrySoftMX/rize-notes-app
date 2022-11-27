import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import { auth } from './AuthService';
import { CreateNoteRequest, Note } from '../interfaces/Note';
import { getFolderById, editFolder } from './FoldersService';

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
 * Filter notes by last number of days
 *
 * @param days - days to filter notes
 * @returns An array of {@link Note}.
 */
export const fileterNotesByLastNumberDays = async (days: number) => {
  const notes = await getNotes();

  const filteredNotes = notes.filter(note => {
    const currentTime = new Date();
    currentTime.setDate(currentTime.getDate() - days);
    const createdAtNote = new Date(note.createAt);
    return createdAtNote.getTime() >= currentTime.getTime();
  });

  return filteredNotes;
};

/**
 * Filter notes by search in content (name and content of note)
 *
 * @param search - search to filter notes
 * @returns An array of {@link Note}.
 */
export const filterNotesByContent = async (search: string) => {
  const notes = await getNotes();

  const filteredNotes = notes.filter(note => {
    const content = note.content + ' ' + note.name;
    return content.includes(search);
  });

  return filteredNotes;
}

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
