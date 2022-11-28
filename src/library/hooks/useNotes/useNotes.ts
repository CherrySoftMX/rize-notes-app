import { foldersState } from '../../state/foldersState';
import { useSetRecoilState } from 'recoil';
import { CreateNoteRequest, Note } from '../../interfaces/Note';
import { createNote, deleteNoteById } from '../../services/NotesService';
import { Folder, FolderWithNotes } from '../../interfaces/Folder';
import { useEffect, useState } from 'react';
import { getFolderAndNotesById } from '../../services/FoldersService';

export const useNotes = (folderId?: string) => {
  const setFolders = useSetRecoilState(foldersState);
  const [folderWithNotes, setFolderWithNotes] = useState<FolderWithNotes>({
    notes: [] as Note[],
  } as FolderWithNotes);

  useEffect(() => {
    if (folderId) {
      getFolderAndNotesById(folderId).then(result => {
        if (result) {
          setFolderWithNotes(result);
        }
      });
    }
  }, [folderId]);

  const handleCreateNote = (noteReq: CreateNoteRequest) => {
    const newNote = createNote(noteReq);
    setFolders(prev => {
      return prev.map(folder => {
        if (folder.id === noteReq.folderId) {
          return { ...folder, noteIds: [...folder.noteIds, newNote.id] };
        } else {
          return folder;
        }
      });
    });
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
          const notesReferences = folder.noteIds.filter(id => id !== noteId);
          const newFolderState: Folder = {
            id: editedFolder.id,
            userId: editedFolder.userId,
            name: editedFolder.name,
            color: editedFolder.color,
            isLimited: editedFolder.isLimited,
            limit: editedFolder.limit,
            noteIds: notesReferences,
          };
          return newFolderState;
        } else {
          return folder;
        }
      });
    });
  };

  return {
    folderWithNotes,
    setFolderWithNotes,
    handleCreateNote,
    handleDeleteNote,
  };
};
