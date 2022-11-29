import { atom } from 'recoil';
import { Note } from '../../library/interfaces/Note';

export const notesState = atom<Note[]>({
  key: 'notesState',
  default: [],
});
