import { useState } from 'react';

export const useToggle = (initialState: boolean): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialState);

  const toggle = () => setValue(!value);

  return [value, toggle];
};
