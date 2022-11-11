import React from 'react';
import { FloatingAction } from 'react-native-floating-action';
import { colors } from '../../../design/tokens';
import { screens } from '../../../library/constants';
import { useRoute } from '@react-navigation/native';

const actions = [
  {
    text: 'Note',
    name: 'bt_note',
    position: 1,
    color: colors.primary,
    icon: require('@assets/float_button/note-icon.png'),
  },
  {
    text: 'Folder',
    name: 'bt_folder',
    position: 2,
    color: colors.primary,
    icon: require('@assets/float_button/folder-icon.png'),
  },
];

export const MultiActionFloatButton = ({ onNotePress, onFolderPress }: any) => {
  const { name } = useRoute();

  if (name !== screens.home) {
    return null;
  }

  return (
    <FloatingAction
      position="right"
      actions={actions}
      color={colors.primary}
      buttonSize={65}
      iconHeight={20}
      iconWidth={20}
      distanceToEdge={{ horizontal: 20, vertical: 20 }}
      onPressItem={actionName => {
        if (actionName === 'bt_note') {
          onNotePress();
        } else {
          onFolderPress();
        }
      }}
    />
  );
};
