import React from 'react';
import { CustomIcon } from '@atoms/CustomIcon/CustomIcon';
import { Flex } from '@react-native-material/core';
import { NotePreview } from '@organisms/NotePreview/NotePreview';
import { colors } from '../../../design/tokens';
import { styles } from './NoteCard.style';
import { IconButtonPopupMenu } from '@molecules/IconButtonPopupMenu';
import { MenuOption } from 'react-native-popup-menu';
import { When } from 'react-if';
import { CardContainer } from '@atoms/CardContainer';
import { RootStackParamList } from '@screens/RootStackParams';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

interface NoteCardProps {
  noteId: string;
  name: string;
  content: string;
  isLink: boolean;
  isFavorite: boolean;
  showContent?: boolean;
  showOptions?: boolean;
  onDelete?: (noteId: string) => void;
}

type NoteScreenParams = NativeStackNavigationProp<RootStackParamList, 'Note'>;

export const NoteCard = ({
  noteId,
  name,
  content,
  isLink,
  isFavorite,
  showContent = true,
  showOptions = true,
  onDelete = () => {},
}: NoteCardProps) => {
  const navigation = useNavigation<NoteScreenParams>();

  const onGoToNote = (id: string) => {
    navigation.navigate('Note', { noteId: id });
  };

  return (
    <CardContainer>
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
          showContent={showContent}
          onPress={() => onGoToNote(noteId)}
        />
        <When condition={showOptions}>
          <IconButtonPopupMenu
            iconLibrary="entypo"
            iconName="dots-three-vertical"
            iconColor={colors.greyNickel}
            style={styles.icon}
            height={55}
            width={55}>
            <MenuOption onSelect={() => onDelete(noteId)} text="Delete" />
          </IconButtonPopupMenu>
        </When>
      </Flex>
    </CardContainer>
  );
};
