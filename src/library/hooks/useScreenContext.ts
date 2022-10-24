import { useContext } from 'react';
import ScreenContext from '../context/ScreenContext';

const useScreenContext = () => {
  const { name, setScreenName } = useContext(ScreenContext);
  return { name, setScreenName };
};

export default useScreenContext;
