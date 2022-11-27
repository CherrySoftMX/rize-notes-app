import { atom } from 'recoil';
import { Folder } from '../../library/interfaces/Folder';

export const foldersState = atom<Folder[]>({
  key: 'foldersState',
  default: [],
});
