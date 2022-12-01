import { useSetRecoilState } from 'recoil';
import { CreateNoteRequest, Note } from '../../interfaces/Note';
import { createNote, deleteNoteById } from '../../services/NotesService';
import { FolderWithNotes } from '../../interfaces/Folder';
import { useEffect, useState } from 'react';
import { getFolderAndNotesById } from '../../services/FoldersService';
import { notesState } from '../../state/notesState';
import { useFolders } from '@hooks/useFolder';

export const useNotes = (folderId?: string) => {
  const { setFolders } = useFolders();
  const setNotes = useSetRecoilState(notesState);
  const [folderWithNotes, setFolderWithNotes] = useState<FolderWithNotes>({
    notes: [] as Note[],
  } as FolderWithNotes);

  useEffect(() => {
    if (folderId) {
      getFolderAndNotesById(folderId).then(result => {
        setFolderWithNotes(result);
      });
    }
  }, [folderId]);

  const handleCreateNote = (noteReq: CreateNoteRequest) => {
    const newNote = createNote(noteReq);
    setFolders(prev => {
      return prev.map(folders => {
        if (folders.id === noteReq.folderId) {
          return { ...folders, noteIds: [...folders.noteIds, newNote.id] };
        } else {
          return folders;
        }
      });
    });
    setNotes(prev => [...prev, newNote]);
  };

  const handleDeleteNote = async (noteId: string) => {
    const deletedNote = await deleteNoteById(noteId, true);
    if (!deletedNote) {
      return;
    }
    const notes = folderWithNotes.notes.filter(
      note => note.id !== deletedNote.id,
    );
    const editedFolder: FolderWithNotes = { ...folderWithNotes, notes };
    setFolderWithNotes(editedFolder);
    setFolders(prev => {
      return prev.map(folder => {
        if (folder.id === editedFolder.id) {
          const remainingNoteIds = folder.noteIds.filter(id => id !== noteId);
          return { ...editedFolder, noteIds: remainingNoteIds };
        } else {
          return folder;
        }
      });
    });
    setNotes(prev => prev.filter(note => note.id !== deletedNote.id));
  };

  return {
    folderWithNotes,
    setFolderWithNotes,
    handleCreateNote,
    handleDeleteNote,
  };
};
