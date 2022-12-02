import {
  createFolder,
  getFoldersOfLoggedUser,
  getFoldersWithNotes,
} from '../../../src/library/services/FoldersService';
import { CreateFolderRequest } from '../../../src/library/interfaces/Folder';

it('Should create a new folder', () => {
  const folder: CreateFolderRequest = {
    name: 'FolderCard 1',
    color: 'red',
    isLimited: false,
  };

  const createdFolder = createFolder(folder);

  expect(createdFolder.id).toBeDefined();
  expect(createdFolder.limit).toBe(0);
  expect(createdFolder.userId).toBeDefined();
  expect(createdFolder.noteIds).toHaveLength(0);
});

it('Should return all stored folders', async () => {
  const obtainedFolders = await getFoldersOfLoggedUser();

  expect(obtainedFolders).toBeDefined();
  expect(obtainedFolders).toHaveLength(0);
});

it('Should return all stored folders with notes', async () => {
  const obtainedFolders = await getFoldersWithNotes();

  expect(obtainedFolders).toBeDefined();
  expect(obtainedFolders).toHaveLength(0);
});
