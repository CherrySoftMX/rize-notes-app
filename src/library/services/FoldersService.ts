import firestore from '@react-native-firebase/firestore';
import { auth } from './AuthService';
import uuid from 'react-native-uuid';
import { FolderInterface } from '../interfaces/FolderInterface';
import { NoteInterface } from '../interfaces/NoteInterface';
import { getNoteById } from './NotesService';

/**
 * Inserts a new folder in the database.
 *
 * @param folderData - A folder.
 *
 * @returns The new folder
 * @beta
 */
export const createNewFolder = (folderData: FolderInterface) => {
  const userId = auth.getCurrentUserId();
  const folderId = uuid.v4();

  const newFolder: FolderInterface = {
    ...folderData,
    limit: folderData.isLimited ? folderData.limit : '0',
    id: `${folderId}`,
    user: userId,
    notes: [],
  };

  firestore()
    .collection('folders')
    .doc(folderId)
    .set(newFolder)
    .catch((err: any) => console.log(err));

  return newFolder;
};

/**
 * Gets all the folders in database of the current app user.
 *
 * @returns An array of {@Link FolderInterface}
 *
 * @beta
 */
export const getFolders = async () => {
  const userId = auth.getCurrentUserId();

  const folders = await firestore()
    .collection('folders')
    .where('user', '==', userId)
    .get();

  if (folders._docs) {
    return folders._docs.map((doc: any) => doc._data as FolderInterface);
  } else {
    return [];
  }
};

/**
 * Gets all the folders in database with their respective notes.
 *
 * @returns An array of {@Link FolderInterface} with complete notes data.
 */
export const getFoldersWithNotes = async () => {
  const folders: Array<FolderInterface> = await getFolders();
  const allFoldersWithNotes = await Promise.all(
    folders.map(async (folder: FolderInterface) => {
      const notes = await getAFolderNotes(folder);
      const completeFolder = { ...folder, notes };
      return completeFolder;
    }),
  );
  return allFoldersWithNotes;
};

/**
 * Gets all the notes of a folder.
 *
 * @param folder - A {@Link FolderInterface} object.
 * @returns An array of {@Link NoteInterface}
 */
const getAFolderNotes = async (folder: FolderInterface) => {
  if (!folder.notes) return [];
  const notes = await Promise.all(
    folder.notes.map(async noteId => {
      const note: NoteInterface = await getNoteById(noteId);
      return note;
    }),
  );
  return notes;
};
