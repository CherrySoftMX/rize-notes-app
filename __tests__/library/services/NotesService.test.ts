import {
  createNote,
  getNoteById,
  getNotesOfLoggedUser,
} from '../../../src/library/services/NotesService';
import { CreateNoteRequest, Note } from '../../../src/library/interfaces/Note';

it('Should create a new note', async () => {
  const note: CreateNoteRequest = {
    name: 'My note',
    content: 'Content',
    folderId: '1',
    isFavorite: false,
    isLink: false,
  };

  const createdNote: Note = await createNote(note);

  expect(createdNote.id).toBeDefined();
  expect(createdNote.image).toBeDefined();
  expect(createdNote.categories).toBeDefined();
  expect(createdNote.categories).toHaveLength(0);
});

it('Should return all stored notes', async () => {
  const obtainedNotes = await getNotesOfLoggedUser();

  expect(obtainedNotes).toBeDefined();
  expect(obtainedNotes).toHaveLength(0);
});

it('Should return an specific note', async () => {
  const note = await getNoteById('id');

  expect(note).toBeDefined();
});
