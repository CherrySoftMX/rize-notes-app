import React, { FC } from 'react';
import { IconButton, IconButtonProps } from '@react-native-material/core';
import { fontSize } from '../../../design/tokens';
import Icon from 'react-native-vector-icons/Ionicons';

interface IoniconButton {
  iconName: string;
  iconSize?: number;
  iconColor?: string;
}

export const IoniconButton: FC<IoniconButton & IconButtonProps> = ({
  style,
  iconName,
  iconSize = fontSize.lg,
  iconColor,
  ...rest
}) => {
  return (
    <IconButton
      {...rest}
      style={style}
      icon={<Icon name={iconName} size={iconSize} color={iconColor} />}
    />
  );
};
