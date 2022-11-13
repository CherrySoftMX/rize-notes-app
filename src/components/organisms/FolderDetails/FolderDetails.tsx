import React from 'react';
import { Alert, Text } from 'react-native';
import { Box, Flex, HStack, Spacer, VStack } from '@react-native-material/core';
import { IconButtonPopupMenu } from '@molecules/IconButtonPopupMenu';
import { MenuOption } from 'react-native-popup-menu';
import { ProgressBar } from '@atoms/ProgressBar/ProgressBar';
import { colors } from '../../../design/tokens';
import { styles as folderDetailsStyle } from './FolderDetails.style';
import { styles } from '@organisms/FolderCard/FolderCard.style';
import { FolderIcon } from '@atoms/FolderIcon';
import { When } from 'react-if';

interface FolderDetailsProps {
  name: string;
  color: string;
  isLimited: boolean;
  limit?: number;
  noteCount: number;
}

export const FolderDetails = ({
  name,
  color,
  isLimited,
  limit,
  noteCount,
}: FolderDetailsProps) => {
  return (
    <Flex style={styles.container} p={4}>
      <HStack>
        <FolderIcon color={color || colors.yellowishMedium} />
        <Spacer />
        <VStack>
          <Text style={folderDetailsStyle.title}>
            {name || 'Unnamed folder'}
          </Text>
          <Text style={folderDetailsStyle.subtitle}>
            {`${noteCount || 0} notes`}
          </Text>
        </VStack>
        <Spacer />
        <IconButtonPopupMenu iconName="menu" iconColor={colors.greyNickel}>
          <MenuOption onSelect={() => Alert.alert('Edit')} text="Edit" />
          <MenuOption onSelect={() => Alert.alert('Delete')} text="Delete" />
        </IconButtonPopupMenu>
      </HStack>
      <Spacer />
      <Box p={6} m={6}>
        <When condition={isLimited}>
          <ProgressBar noteCount={noteCount} size={limit || 0} />
        </When>
      </Box>
    </Flex>
  );
};
