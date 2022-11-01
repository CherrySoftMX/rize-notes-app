/**
 * An interface containing the properties of a folder.
 */
export interface FolderInterface {
  id?: string;
  name: string;
  color: string;
  user?: string;
  isLimited: boolean;
  limit?: string;
  notes?: Array<string>;
}
