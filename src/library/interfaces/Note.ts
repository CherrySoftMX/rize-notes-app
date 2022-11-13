/**
 * An interface containing the properties of a Note.
 *
 */
export interface Note {
  id: string;
  userId: string;
  name: string;
  content: string;
  folderId: string;
  isFavorite: boolean;
  isLink: boolean;
  image?: string;
  categories: string[];
}

export interface CreateNoteRequest {
  name: string;
  content: string;
  folderId: string;
  isFavorite: boolean;
  isLink: boolean;
  image?: string;
  categories?: string[];
}
