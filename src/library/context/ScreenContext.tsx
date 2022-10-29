import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { screens } from '../constants';

interface Screen {
  name: string;
  setScreenName: Dispatch<SetStateAction<string>>;
}

const ScreenContext = createContext<Screen>({} as any);

export const ScreenProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setScreenName] = useState(screens.home);
  return (
    <ScreenContext.Provider value={{ name, setScreenName }}>
      {children}
    </ScreenContext.Provider>
  );
};

export default ScreenContext;
