import { selector } from 'recoil';
import { notesState } from './notesState';
import { colors } from '../../design/tokens';

export const favoriteNotes = selector({
  key: 'FavoritesData',
  get: ({ get }) => {
    const notes = get(notesState);
    const favorites = notes.filter(note => note.isFavorite);
    const favoritesFolder = {
      id: '',
      name: 'Favorites',
      color: colors.yellowishMedium,
      isLimited: false,
      noteCount: favorites.length,
    };
    return {
      favorites,
      favoritesFolder,
    };
  },
});
