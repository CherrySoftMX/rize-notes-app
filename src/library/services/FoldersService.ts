import firestore from '@react-native-firebase/firestore';
import { auth } from './AuthService';
import uuid from 'react-native-uuid';
import {
  CreateFolderRequest,
  Folder,
  FolderWithNotes,
} from '../interfaces/Folder';
import { getNoteById, deleteNoteById } from './NotesService';
import { Note } from '../interfaces/Note';

/**
 * Inserts a new folder in the database.
 *
 * @param folderRequest - A folder.
 *
 * @returns The new folder
 *
 * @beta
 */
export const createFolder = (folderRequest: CreateFolderRequest): Folder => {
  const userId = auth.getCurrentUserId();
  const folderId = uuid.v4() as string;

  const newFolder: Folder = {
    ...folderRequest,
    id: `${folderId}`,
    userId,
    limit: folderRequest.isLimited ? folderRequest.limit : 0,
    noteIds: [],
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
export const getFolders = async (): Promise<Folder[]> => {
  const userId = auth.getCurrentUserId();

  const folders = await firestore()
    .collection('folders')
    .where('userId', '==', userId)
    .get();

  if (folders.docs) {
    return folders.docs.map((doc: any) => doc._data as Folder);
  } else {
    return [];
  }
};

/**
 * Gets all the folders in database with their respective notes.
 *
 * @returns An array of {@Link FolderInterface} with complete notes data.
 */
export const getFoldersWithNotes = async (): Promise<FolderWithNotes[]> => {
  const folders = await getFolders();
  return await Promise.all(
    folders.map(async folder => {
      const notes = await getNotesOfFolder(folder);
      return { ...folder, notes };
    }),
  );
};

/**
 * Gets all the notes of a folder.
 *
 * @param folder - A {@Link FolderInterface} object.
 * @returns An array of {@Link NoteInterface}
 */
export const getNotesOfFolder = async (folder: Folder): Promise<Note[]> => {
  if (!folder.noteIds) {
    return [];
  }
  return await Promise.all(
    folder.noteIds.map(async noteId => {
      const note = await getNoteById(noteId);
      return note!!;
    }),
  );
};

/**
 * Gets a folder by id
 *
 * @param folderId - The id of the folder to retrieve
 * @returns A {@Link Folder} object.
 */
export const getFolderById = async (folderId: string) => {
  const folderQuery = await firestore()
    .collection('folders')
    .where('id', '==', folderId)
    .get();
  if (!folderQuery.docs) {
    return {} as Folder;
  }
  const folder = (folderQuery.docs[0] as any)._data as Folder;
  return folder;
};

/**
 * Gets a folder and its notes by id
 *
 * @param folderId - The id of the folder to retrieve
 * @returns A {@Link FolderWithNotes} object.
 */
export const getFolderAndNotesById = async (
  folderId: string,
): Promise<FolderWithNotes | null> => {
  const folder = await getFolderById(folderId);
  const notes = await getNotesOfFolder(folder);
  return { ...folder, notes };
};

/**
 * Deletes all the notes associated to a folder
 *
 * @param folderId - The id of the folder
 */
export const deleteAllNotesOfAFolderById = async (folder: Folder) => {
  await Promise.all(
    folder.noteIds.map(async noteId => {
      await deleteNoteById(noteId);
    }),
  );
};

/**
 * Deletes a folder and its notes by id
 *
 * @param folderId - The id of the folder to delete
 * @returns The deleted {@Link Folder} object.
 */
export const deleteFolderById = async (folderId: string) => {
  const folderToDelete: Folder = await getFolderById(folderId);
  await deleteAllNotesOfAFolderById(folderToDelete);
  await firestore().collection('folders').doc(folderId).delete();
  return folderToDelete;
};
