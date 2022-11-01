/**
 * An interface containing the properties of a Note.
 *
 */
export interface NoteInterface {
  id?: string;
  user?: string;
  name: string;
  content: string;
  folder: string;
  isFavorite: boolean;
  isLink: boolean;
  image?: string;
  categories?: Array<String>;
}
