import { useRecoilState, useSetRecoilState } from 'recoil';
import { foldersState } from '../../state/foldersState';
import {
  createFolder,
  deleteFolderById,
  editFolder,
  getFoldersOfLoggedUser,
} from '../../services/FoldersService';
import { CreateFolderRequest, Folder } from '../../interfaces/Folder';
import { notesState } from '../../state/notesState';
import { useEffect } from 'react';

export const useFolders = () => {
  const [folders, setFolders] = useRecoilState(foldersState);
  const setNotes = useSetRecoilState(notesState);

  useEffect(() => {
    getFoldersOfLoggedUser().then(result => {
      setFolders(result);
    });
  }, [setFolders]);

  const handleCreateFolder = (folderReq: CreateFolderRequest) => {
    const newFolder = createFolder(folderReq);
    setFolders(prev => [newFolder, ...prev]);
  };

  const handleEditFolder = async (editedFolder: Folder) => {
    const updatedFolders = folders.map(folder => {
      return folder.id === editedFolder.id ? editedFolder : folder;
    });
    setFolders(updatedFolders);
    await editFolder(editedFolder);
  };

  const handleDeleteFolder = async (folderId: string) => {
    const deletedFolder = await deleteFolderById(folderId);
    setFolders(prev => prev.filter(f => f.id !== folderId));
    setNotes(prev => prev.filter(note => note.folderId !== deletedFolder.id));
  };

  return {
    folders,
    setFolders,
    handleCreateFolder,
    handleEditFolder,
    handleDeleteFolder,
  };
};
