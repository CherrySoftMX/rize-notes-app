import { atom } from 'recoil';
import { Folder } from '../interfaces/Folder';

export const foldersState = atom<Folder[]>({
  key: 'foldersState',
  default: [],
});
