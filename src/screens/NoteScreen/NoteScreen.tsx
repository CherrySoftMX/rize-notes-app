import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@screens/RootStackParams';
import { ScreenHeader } from '@organisms/ScreenHeader';
import { NoteCard } from '@organisms/NoteCard';
import { CardContainer } from '@atoms/CardContainer';
import { colors, fontSize } from '../../design/tokens';
import { ScreenWrapper } from '@atoms/ScreenWrapper';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { FolderIcon } from '@atoms/FolderIcon';
import { getFolderById } from '../../library/services/FoldersService';
import { Folder } from '../../library/interfaces/Folder';
import { styles } from './NoteScreen.style';
import { Note } from '../../library/interfaces/Note';
import { getNoteById } from '../../library/services/NotesService';
import { useBoolean } from '@react-native-material/core';
import { NoteForm } from '@organisms/NoteForm';
import { useNotes } from '@hooks/useNotes';

type NoteRouteProp = RouteProp<RootStackParamList, 'Note'>;

export const NoteScreen = () => {
  const route = useRoute<NoteRouteProp>();
  const [showNoteModal, setShowNoteModal] = useBoolean(false);
  const [folder, setFolder] = useState<Folder>();
  const [note, setNote] = useState<Note | null>();
  const { handleEditNote } = useNotes();

  useEffect(() => {
    getNoteById(route.params.noteId)
      .then(n => {
        setNote(n);
        return n;
      })
      .then(n => {
        if (n) {
          getFolderById(n.folderId).then(setFolder);
        }
      });
  }, [route.params.noteId]);

  const onEditNote = async (editedNote: Note) => {
    setNote(editedNote);
    await handleEditNote(editedNote);
  };

  if (!note) {
    return null;
  }

  return (
    <SafeAreaView>
      <ScreenWrapper>
        <ScrollView>
          <ScreenHeader title="Note" />
          <Pressable onPress={setShowNoteModal.on}>
            <Text style={{ fontSize: fontSize.xl }}>Edit</Text>
          </Pressable>
          <NoteCard
            {...note}
            noteId={note.id}
            showContent={false}
            showOptions={false}
          />
          <CardContainer style={styles.folderContentContainer}>
            <Text style={styles.folderContent}>{note.content}</Text>
            <Text style={styles.folderContentLength}>
              {note.content.length} / 250
            </Text>
          </CardContainer>
          <ScreenTitle label="Folder" align="flex-start" />
          <CardContainer style={styles.folderContainer}>
            <FolderIcon color={folder?.color || colors.yellowishMedium} />
            <Text numberOfLines={2} style={styles.folderName}>
              {folder?.name}
            </Text>
          </CardContainer>
        </ScrollView>
        <NoteForm
          note={note}
          folders={[]}
          onEdit={onEditNote}
          showModal={showNoteModal}
          closeModal={setShowNoteModal.off}
        />
      </ScreenWrapper>
    </SafeAreaView>
  );
};
