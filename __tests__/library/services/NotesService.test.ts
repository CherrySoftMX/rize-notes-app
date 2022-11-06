import {
  createNewNote,
  getNotes,
  getNoteById,
} from '../../../src/library/services/NotesService';
import { NoteInterface } from '../../../src/library/interfaces/NoteInterface';

it('Should create a new note', async () => {
  const note: NoteInterface = {
    name: 'My note',
    content: 'Content',
    folder: '1',
    isFavorite: false,
    isLink: false,
  };

  const createdNote: NoteInterface = await createNewNote(note);

  expect(createdNote.id).toBeDefined();
  expect(createdNote.image).toBeDefined();
  expect(createdNote.categories).toBeDefined();
  expect(createdNote.categories).toHaveLength(0);
});

it('Should return all stored notes', async () => {
  const obtainedNotes = await getNotes();
  expect(obtainedNotes).toBeDefined();
  expect(obtainedNotes).toHaveLength(0);
});

it('Should return an specific note', async () => {
  const note = await getNoteById('id');
  expect(note).toBeDefined();
});
