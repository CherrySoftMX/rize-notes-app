import { atom } from 'recoil';
import { LocalUser } from '../../library/interfaces/User';

export const userState = atom<LocalUser>({
  key: 'userState',
  default: { id: '', email: '', isLogged: false },
});
