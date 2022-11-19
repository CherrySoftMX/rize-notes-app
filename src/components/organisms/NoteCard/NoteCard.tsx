import React from 'react';
import { CustomIcon } from '@atoms/CustomIcon/CustomIcon';
import { Flex } from '@react-native-material/core';
import { NotePreview } from '@organisms/NotePreview/NotePreview';
import { colors } from '../../../design/tokens';
import { styles } from './NoteCard.style';
import { IconButtonPopupMenu } from '@molecules/IconButtonPopupMenu';
import { MenuOption } from 'react-native-popup-menu';
import { Alert } from 'react-native';
import { Note } from '../../../library/interfaces/Note';

export const NoteCard = ({ name, content, isLink, isFavorite }: Note) => {
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
        title={name || 'Unnamed'}
        content={content || 'Empty note'}
        style={styles.textContainer}
      />
      <IconButtonPopupMenu
        iconLibrary="entypo"
        iconName="dots-three-vertical"
        iconColor={colors.greyNickel}
        style={styles.icon}
        height={55}
        width={55}>
        <MenuOption onSelect={() => Alert.alert('Edit')} text="Edit" />
        <MenuOption onSelect={() => Alert.alert('Delete')} text="Delete" />
      </IconButtonPopupMenu>
    </Flex>
  );
};
