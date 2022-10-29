import { useState } from 'react';
import { AuthService } from '../../services/AuthService';

export const useAuth = () => {
  const [user, setUser] = useState(
    AuthService.getInstance().getCurrentUserId(),
  );
  const startAuth = async (firebaseUser: any) => {
    const userId = await AuthService.getInstance().initiateApp(firebaseUser);
    setUser(userId);
  };
  return { user, startAuth };
};
