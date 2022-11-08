import {
  createNewFolder,
  getFolders,
  getFoldersWithNotes,
} from '../../../src/library/services/FoldersService';
import { FolderInterface } from '../../../src/library/interfaces/FolderInterface';

it('Should create a new folder', () => {
  const folder: FolderInterface = {
    name: 'Folder 1',
    color: 'red',
    isLimited: false,
  };

  const createdFolder = createNewFolder(folder);

  expect(createdFolder.id).toBeDefined();
  expect(createdFolder.limit).toBe('0');
  expect(createdFolder.user).toBeDefined();
  expect(createdFolder.notes).toHaveLength(0);
});

it('Should return all stored folders', async () => {
  const obtainedFolders = await getFolders();
  expect(obtainedFolders).toBeDefined();
  expect(obtainedFolders).toHaveLength(0);
});

it('Should return all stored folders with notes', async () => {
  const obtainedFolders = await getFoldersWithNotes();
  expect(obtainedFolders).toBeDefined();
  expect(obtainedFolders).toHaveLength(0);
});
