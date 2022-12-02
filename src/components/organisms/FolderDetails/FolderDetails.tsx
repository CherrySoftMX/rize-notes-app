import React from 'react';
import { Text, View } from 'react-native';
import { Flex } from '@react-native-material/core';
import { IconButtonPopupMenu } from '@molecules/IconButtonPopupMenu';
import { MenuOption } from 'react-native-popup-menu';
import { ProgressBar } from '@atoms/ProgressBar/ProgressBar';
import { colors } from '../../../design/tokens';
import { styles as folderDetailsStyle } from './FolderDetails.style';
import { styles } from '@organisms/FolderCard/FolderCard.style';
import { FolderIcon } from '@atoms/FolderIcon';
import { When } from 'react-if';
import { CardContainer } from '@atoms/CardContainer';

interface FolderDetailsProps {
  id: string;
  name: string;
  color: string;
  isLimited: boolean;
  limit?: number;
  noteCount: number;
  handleEdit: () => void;
  handleDelete: (id: string) => void;
}

export const FolderDetails = ({
  id,
  name,
  color,
  isLimited,
  limit,
  noteCount,
  handleEdit,
  handleDelete,
}: FolderDetailsProps) => {
  return (
    <CardContainer style={{ marginTop: 0 }}>
      <View style={[styles.container, folderDetailsStyle.container]}>
        <Flex direction="row" style={folderDetailsStyle.headerContainer}>
          <View style={folderDetailsStyle.folderIcon}>
            <FolderIcon color={color || colors.yellowishMedium} />
          </View>
          <View style={folderDetailsStyle.titleContainer}>
            <Text style={folderDetailsStyle.title} numberOfLines={2}>
              {name}
            </Text>
            <Text style={folderDetailsStyle.subtitle}>
              {`${noteCount || 0} notes`}
            </Text>
          </View>
          <IconButtonPopupMenu
            iconLibrary="entypo"
            iconName="dots-three-vertical"
            iconColor={colors.greyNickel}
            style={folderDetailsStyle.menuIcon}
            height={60}
            width={55}>
            <MenuOption onSelect={() => handleEdit()} text="Edit" />
            <MenuOption onSelect={() => handleDelete(id)} text="Delete" />
          </IconButtonPopupMenu>
        </Flex>
        <View style={folderDetailsStyle.barContainer}>
          <When condition={isLimited}>
            <ProgressBar noteCount={noteCount} size={limit || 0} />
          </When>
        </View>
      </View>
    </CardContainer>
  );
};
