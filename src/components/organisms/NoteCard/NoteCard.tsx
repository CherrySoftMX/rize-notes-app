import React from 'react';
import { CustomIcon } from '@atoms/CustomIcon/CustomIcon';
import { Flex } from '@react-native-material/core';
import { HairLine } from '@atoms/HairLine';
import { NotePreview } from '@organisms/NotePreview/NotePreview';
import { colors } from '../../../design/tokens';
import { styles } from './NoteCard.style';
import { IconButtonPopupMenu } from '@molecules/IconButtonPopupMenu';
import { MenuOption } from 'react-native-popup-menu';
import { Alert } from 'react-native';
import { Note } from '../../../library/interfaces/Note';
import { When } from 'react-if';

export const NoteCard = ({ name, content, isLink, isFavorite }: Note) => {
  return (
    <Flex fill direction="row" self="center" style={styles.card}>
      <When condition={isFavorite}>
        <HairLine w={4} h="100%" color={colors.yellowishMedium} />
      </When>
      <CustomIcon
        name={isLink ? 'link' : 'text-fields'}
        size={20}
        color={colors.pureWhite}
        isRounded
      />
      <NotePreview
        title={name || 'Unnamed'}
        content={content || 'Empty note'}
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
