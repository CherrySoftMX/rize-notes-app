import { auth } from '../../services/AuthService';
import { FirebaseUser } from '../../../library/interfaces/User';
import { userState } from '../../../library/state/userState';
import { useRecoilState } from 'recoil';

/**
 * Custom hook to allow easier use of AuthService methods.
 *
 * @returns The current user ID and a method to init the app.
 */
export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const startAuth = async (firebaseUser: FirebaseUser) => {
    const userId = await auth.initiateApp(firebaseUser);
    setUser(userId);
    console.log('Nuevo usuario:');
    console.log(userId);
  };
  return { user, startAuth };
};
