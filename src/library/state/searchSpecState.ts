import { atom } from 'recoil';
import { SearchSpec } from '../constants/searchSpec';
import { ALL_TIME } from '../constants';

export const searchSpecState = atom<SearchSpec>({
  key: 'queryState',
  default: { query: '', antiquityOption: ALL_TIME },
});
