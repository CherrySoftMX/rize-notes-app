import firestore from '@react-native-firebase/firestore';
import { auth } from './AuthService';
import uuid from 'react-native-uuid';
import {
  CreateFolderRequest,
  Folder,
  FolderWithNotes,
} from '../interfaces/Folder';
import { deleteNoteById, getNoteById } from './NotesService';
import { Note } from '../interfaces/Note';

/**
 * Inserts a new folder in the database.
 *
 * @param folderReq - A folder.
 *
 * @returns The new folder
 *
 * @beta
 */
export const createFolder = (folderReq: CreateFolderRequest): Folder => {
  const userId = auth.getCurrentUserId();
  const folderId = uuid.v4() as string;

  const newFolder: Folder = {
    ...folderReq,
    id: `${folderId}`,
    userId,
    limit: folderReq.isLimited ? folderReq.limit : 0,
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
export const getFoldersOfLoggedUser = async (): Promise<Folder[]> => {
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
  const folders = await getFoldersOfLoggedUser();
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
  return (folderQuery.docs[0] as any)._data as Folder;
};

/**
 * Gets a folder and its notes by id
 *
 * @param folderId - The id of the folder to retrieve
 * @returns A {@Link FolderWithNotes} object.
 */
export const getFolderAndNotesById = async (
  folderId: string,
): Promise<FolderWithNotes> => {
  const folder = await getFolderById(folderId);
  const notes = await getNotesOfFolder(folder);
  return { ...folder, notes };
};

/**
 * Deletes all the notes associated to the specified folder
 *
 * @param folder - A folder
 */
export const deleteAllNotesOfFolder = async (folder: Folder) => {
  await Promise.all(
    folder.noteIds.map(async noteId => {
      await deleteNoteById(noteId, false);
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
  await deleteAllNotesOfFolder(folderToDelete);
  await firestore().collection('folders').doc(folderId).delete();
  return folderToDelete;
};

/**
 * Edits the content of a folder
 *
 * @param folder - A {@Link Folder} object containing the new data
 */
export const editFolder = async (folder: Folder) => {
  const { name, color, isLimited, limit, noteIds } = folder;
  await firestore()
    .collection('folders')
    .doc(folder.id)
    .update({
      name,
      color,
      isLimited,
      limit,
      noteIds,
    })
    .catch((err: any) => console.log(err));
};

/**
 * Uploads the array of {@Link Folder} to firestore with
 * the provided id of the user.
 *
 * @param newUserId - The new id which will replace the old id.
 * @param folders - An array of {@Link Folder}.
 */
export const uploadAndChangeUserOfFolders = async (
  newUserId: string,
  folders: Array<Folder>,
) => {
  await Promise.all(
    folders.map(folder => {
      firestore()
        .collection('folders')
        .doc(folder.id)
        .set({
          ...folder,
          userId: newUserId,
        })
        .catch((err: any) => console.log(err));
    }),
  );
};

/**
 * Updates the user id of existing folders.
 *
 * @param newUserId - The new id which will replace the old id.
 * @param folders - An array of {@Link Folder}.
 */
export const changeUserOfFolders = (
  newUserId: string,
  folders: Array<Folder>,
) => {
  folders.map(folder => {
    firestore()
      .collection('folders')
      .doc(folder.id)
      .update({ userId: newUserId })
      .catch((err: any) => console.log(err));
  });
};
