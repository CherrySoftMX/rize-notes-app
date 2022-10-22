import React, { FC } from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import { fontSize } from '../../../design/tokens';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';

interface IconButtonContextMenu {
  iconName: string;
  iconColor: string;
  iconSize?: number;
  width?: number;
  height?: number;
  children: React.ReactNode;
}

export const IconButtonPopupMenu: FC<
  IconButtonContextMenu & PressableProps
> = ({
  iconName,
  iconColor,
  iconSize = fontSize.lg,
  width = 48,
  height = 48,
  children,
  ...rest
}) => {
  return (
    <Pressable {...rest}>
      <Menu>
        <MenuTrigger>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: width,
              height: height,
            }}>
            <Icon name={iconName} color={iconColor} size={iconSize} />
          </View>
        </MenuTrigger>
        <MenuOptions>{children}</MenuOptions>
      </Menu>
    </Pressable>
  );
};
