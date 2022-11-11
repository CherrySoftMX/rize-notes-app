import { Note } from './Note';

/**
 * An interface containing the properties of a folder.
 */
export interface Folder {
  id: string;
  name: string;
  color: string;
  userId: string;
  isLimited: boolean;
  limit?: number;
  noteIds: string[];
}

export type FolderWithNotes = Omit<Folder, 'noteIds'> & { notes: Note[] };

export interface CreateFolderRequest {
  name: string;
  color: string;
  isLimited: boolean;
  limit?: number;
}
