import { atom } from 'recoil';
import { Folder } from '../interfaces/Folder';
import { getFoldersOfLoggedUser } from '../services/FoldersService';

export const foldersState = atom<Folder[]>({
  key: 'foldersState',
  default: [],
});
