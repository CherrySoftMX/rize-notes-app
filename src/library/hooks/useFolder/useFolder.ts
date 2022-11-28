import { useRecoilState } from 'recoil';
import { foldersState } from '../../state/foldersState';
import {
  createFolder,
  deleteFolderById,
  editFolder,
} from '../../services/FoldersService';
import { CreateFolderRequest, Folder } from '../../interfaces/Folder';

export const useFolder = () => {
  const [folders, setFolders] = useRecoilState(foldersState);

  const handleCreateFolder = (folderRequest: CreateFolderRequest) => {
    const newFolder = createFolder(folderRequest);
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
    await editFolder(folderReq);
    setFolders(_folders);
  };

  const handleDeleteFolder = async (folderId: string) => {
    await deleteFolderById(folderId);
    setFolders(prev => prev.filter(f => f.id !== folderId));
  };

  return {
    folders,
    setFolders,
    handleCreateFolder,
    handleEditFolder,
    handleDeleteFolder,
  };
};
