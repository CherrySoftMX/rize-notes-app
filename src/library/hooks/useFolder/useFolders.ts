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

  const handleEditFolder = async (folderReq: Folder) => {
    const _folders = folders.map(folder => {
      if (folder.id === folderReq.id) {
        return folderReq;
      } else {
        return folder;
      }
    });
    setFolders(_folders);
    await editFolder(folderReq);
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
