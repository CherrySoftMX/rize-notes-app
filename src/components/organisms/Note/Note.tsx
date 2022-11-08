import React from 'react';
import { CustomIcon } from '@atoms/CustomIcon/CustomIcon';
import { Flex } from '@react-native-material/core';
import { HairLine } from '@atoms/HairLine';
import { NotePreview } from '@organisms/NotePreview/NotePreview';
import { colors } from '../../../design/tokens';
import { styles } from './Note.style';
import { IconButtonPopupMenu } from '@molecules/IconButtonContextMenu';
import { MenuOption } from 'react-native-popup-menu';
import { Alert } from 'react-native';
import { NoteInterface } from '../../../library/interfaces/NoteInterface';

export const Note = ({ name, content, isLink, isFavorite }: NoteInterface) => {
  return (
    <Flex fill direction="row" self="center" style={styles.card}>
      {isFavorite && <HairLine w={4} h="100%" color={colors.yellowishMedium} />}
      <CustomIcon
        name={isLink ? 'link' : 'text-fields'}
        size={20}
        color={colors.pureWhite}
        isRounded
      />
      <NotePreview
        title={name ? name : 'Unnamed'}
        content={content ? content : 'Empty note'}
      />
      <IconButtonPopupMenu
        iconName="menu"
        iconColor={colors.greyNickel}
        style={styles.icon}>
        <MenuOption onSelect={() => Alert.alert('Edit')} text="Edit" />
        <MenuOption onSelect={() => Alert.alert('Delete')} text="Delete" />
      </IconButtonPopupMenu>
    </Flex>
  );
};
