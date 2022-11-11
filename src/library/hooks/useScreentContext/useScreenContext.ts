import { useContext } from 'react';
import ScreenContext from '../../context/ScreenContext';

/**
 * Returns the current screen name.
 *
 * @deprecated use useRoute hook from @react-navigation/native instead.
 */
export const useScreenContext = () => {
  const { name, setScreenName } = useContext(ScreenContext);
  return { name, setScreenName };
};
