import { auth } from '../../services/AuthService';
import { FirebaseUser } from '../../../library/interfaces/User';
import { userState } from '../../../library/state/userState';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { foldersState } from '../../../library/state/foldersState';
import { getFolders } from '../../../library/services/FoldersService';
import { notesState } from '../../../library/state/notesState';
import { getNotes } from '../../../library/services/NotesService';

/**
 * Custom hook to allow easier use of AuthService methods.
 *
 * @returns The current user ID and a method to init the app.
 */
export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const setFolders = useSetRecoilState(foldersState);
  const setNotes = useSetRecoilState(notesState);

  const startAuth = async (firebaseUser: FirebaseUser) => {
    const userId = await auth.initiateApp(firebaseUser);
    setUser(userId);

    console.log('Nuevo usuario:');
    console.log(userId);

    const folders = await getFolders();
    setFolders(folders);

    const notes = await getNotes();
    setNotes(notes);
  };

  return { user, startAuth };
};
