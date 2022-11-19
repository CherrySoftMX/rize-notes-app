import React from 'react';
import { Alert, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './CustomIcon.style';
import { colors } from '../../../design/tokens/colors';

interface CustomIconProps {
  name: string;
  size: number;
  color: string;
  isRounded?: boolean;
  backgroundColor?: string;
}

export const CustomIcon = ({
  name,
  size,
  color,
  isRounded,
  backgroundColor = colors.mediumGrey,
}: CustomIconProps) => {
  return (
    <View
      style={[styles.fs, { alignSelf: isRounded ? 'center' : 'flex-start' }]}>
      <Pressable
        style={[isRounded ? styles.round : {}, { backgroundColor }]}
        onPress={() => {
          Alert.alert('Icon Pressed!');
        }}>
        <Icon name={name} size={size} color={color} />
      </Pressable>
    </View>
  );
};
