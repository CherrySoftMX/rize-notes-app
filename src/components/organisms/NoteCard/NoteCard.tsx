import React from 'react';
import { CustomIcon } from '@atoms/CustomIcon/CustomIcon';
import { Flex } from '@react-native-material/core';
import { NotePreview } from '@organisms/NotePreview/NotePreview';
import { colors } from '../../../design/tokens';
import { styles } from './NoteCard.style';
import { IconButtonPopupMenu } from '@molecules/IconButtonPopupMenu';
import { MenuOption } from 'react-native-popup-menu';

interface NoteCardProps {
  noteId: string;
  name: string;
  content: string;
  isLink: boolean;
  isFavorite: boolean;
  onPress: (noteId: string) => void;
  onDelete: (noteId: string) => void;
}

export const NoteCard = ({
  noteId,
  name,
  content,
  isLink,
  isFavorite,
  onDelete = () => {},
  onPress = () => {},
}: NoteCardProps) => {
  return (
    <Flex direction="row" style={styles.card}>
      <CustomIcon
        name={isLink ? 'link' : 'text-fields'}
        size={20}
        color={isFavorite ? colors.eerieBlack : colors.pureWhite}
        backgroundColor={
          isFavorite ? colors.yellowishMedium : colors.mediumGrey
        }
        isRounded
      />
      <NotePreview
        noteId={noteId}
        title={name || 'Unnamed'}
        content={content || 'Empty note'}
        onPress={onPress}
      />
      <IconButtonPopupMenu
        iconLibrary="entypo"
        iconName="dots-three-vertical"
        iconColor={colors.greyNickel}
        style={styles.icon}
        height={55}
        width={55}>
        <MenuOption onSelect={() => onDelete(noteId)} text="Delete" />
      </IconButtonPopupMenu>
    </Flex>
  );
};
