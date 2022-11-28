import React from 'react';
import { Text } from '@react-native-material/core';
import { Pressable } from 'react-native';
import { styles } from './NotePreview.style';

interface NotePreviewProps {
  noteId: string;
  title: string;
  content: string;
  onPress: (noteId: string) => void;
}

export const NotePreview = ({
  noteId,
  title,
  content,
  onPress,
}: NotePreviewProps) => {
  return (
    <Pressable style={styles.textContainer} onPress={() => onPress(noteId)}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.textEllipsis} numberOfLines={1}>
        {content}
      </Text>
    </Pressable>
  );
};
