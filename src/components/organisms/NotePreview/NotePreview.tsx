import React from 'react';
import { Text } from '@react-native-material/core';
import { View } from 'react-native';
import { styles } from './NotePreview.style';

interface NotePreviewProps {
  title: string;
  content: string;
}

export const NotePreview = ({ title, content, ...rest }: NotePreviewProps) => {
  return (
    <View style={styles.item} {...rest}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Text style={styles.textEllipsis} numberOfLines={1}>
        {content}
      </Text>
    </View>
  );
};
