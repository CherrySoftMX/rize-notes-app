import { Note } from 'library/interfaces/Note';

export type RootStackParamList = {
  Home: undefined;
  Folder: { folderId: string };
  Settings: undefined;
  Register: undefined;
  Login: undefined;
  Search: { notes: Array<Note>; query: string };
};
