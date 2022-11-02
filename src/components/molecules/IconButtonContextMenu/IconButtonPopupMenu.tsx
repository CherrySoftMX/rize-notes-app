import React, { FC } from 'react';
import { Pressable, PressableProps, View } from 'react-native';
import { fontSize } from '../../../design/tokens';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';

interface IconButtonContextMenu {
  iconName: string;
  iconColor: string;
  iconSize?: number;
  width?: number;
  height?: number;
  children: React.ReactNode;
  vAlign?: string;
  hAlign?: string;
  iconLibrary?: string;
}

export const IconButtonPopupMenu: FC<
  IconButtonContextMenu & PressableProps
> = ({
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
              justifyContent: vAlign,
              alignItems: hAlign,
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
