import { auth } from '../../services/AuthService';
import { FirebaseUser } from '../../interfaces/User';
import { userState } from '../../state/userState';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { foldersState } from '../../state/foldersState';
import { getFoldersOfLoggedUser } from '../../services/FoldersService';
import { notesState } from '../../state/notesState';
import { getNotesOfLoggedUser } from '../../services/NotesService';

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

    const folders = await getFoldersOfLoggedUser();
    setFolders(folders);

    const notes = await getNotesOfLoggedUser();
    setNotes(notes);
  };

  return { user, startAuth };
};
