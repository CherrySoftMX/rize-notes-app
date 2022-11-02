import React from 'react';
import { Alert, Text } from 'react-native';
import { Box, Flex, HStack, Spacer, VStack } from '@react-native-material/core';
import { CustomIcon } from '@atoms/CustomIcon/CustomIcon';
import { IconButtonPopupMenu } from '@molecules/IconButtonContextMenu';
import { MenuOption } from 'react-native-popup-menu';
import { ProgressBar } from '@atoms/ProgressBar/ProgressBar';
import { colors } from '../../../design/tokens/colors';
import { styles } from './Folder.style';
import { FolderInterface } from '../../../library/interfaces/FolderInterface';

export const Folder = ({
  name,
  color,
  isLimited,
  limit = '1',
  notes,
}: FolderInterface) => {
  return (
    <Flex fill style={styles.container} p={6}>
      <HStack>
        <CustomIcon name="folder" size={70} color={color} />
        <Spacer />
        <IconButtonPopupMenu iconName="menu" iconColor={colors.greyNickel}>
          <MenuOption onSelect={() => Alert.alert('Edit')} text="Edit" />
          <MenuOption onSelect={() => Alert.alert('Delete')} text="Delete" />
        </IconButtonPopupMenu>
      </HStack>
      <VStack m={8} spacing={8}>
        <Box>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{notes?.length}</Text>
        </Box>
        <Spacer />
        {isLimited && (
          <Box>
            <ProgressBar completed={notes?.length || 0} size={Number(limit)} />
          </Box>
        )}
      </VStack>
    </Flex>
  );
};
