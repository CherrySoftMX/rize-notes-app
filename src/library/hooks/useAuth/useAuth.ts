import { useState } from 'react';
import { auth } from '../../services/AuthService';

/**
 * Custom hook to allow easier use of AuthService methods.
 *
 * @returns The current user ID and a method to init the app.
 */
export const useAuth = () => {
  const [user, setUser] = useState(auth.getCurrentUserId());
  const startAuth = async (firebaseUser: any) => {
    const userId = await auth.initiateApp(firebaseUser);
    setUser(userId);
  };
  return { user, startAuth };
};
