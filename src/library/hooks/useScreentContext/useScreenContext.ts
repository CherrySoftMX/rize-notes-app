import { useContext } from 'react';
import ScreenContext from '../../context/ScreenContext';

export const useScreenContext = () => {
  const { name, setScreenName } = useContext(ScreenContext);
  return { name, setScreenName };
};
