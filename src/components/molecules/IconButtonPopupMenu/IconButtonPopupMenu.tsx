import React, { FC } from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import { fontSize } from '../../../design/tokens';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';

interface IconButtonContextMenuProps extends PressableProps {
  iconName: string;
  iconColor: string;
  iconSize?: number;
  width?: number;
  height?: number;
  vAlign?: string;
  hAlign?: string;
  iconLibrary?: string;
  children: React.ReactNode;
}

export const IconButtonPopupMenu: FC<IconButtonContextMenuProps> = ({
  iconName,
  iconColor,
  iconSize = fontSize.lg,
  width = 48,
  height = 48,
  hAlign = 'center',
  vAlign = 'center',
  children,
  iconLibrary = 'ionicons',
  ...rest
}) => {
  return (
    <Pressable {...rest}>
      <Menu>
        <MenuTrigger>
          <View
            style={{
              width: width,
              height: height,
            }}>
            {iconLibrary === 'ionicons' ? (
              <Icon name={iconName} color={iconColor} size={iconSize} />
            ) : (
              <IconEntypo name={iconName} color={iconColor} size={iconSize} />
            )}
          </View>
        </MenuTrigger>
        <MenuOptions>{children}</MenuOptions>
      </Menu>
    </Pressable>
  );
};
