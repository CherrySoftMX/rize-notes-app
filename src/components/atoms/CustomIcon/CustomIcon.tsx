import React from 'react';
import { Alert, FlexAlignType, Pressable, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './CustomIcon.style';

interface CustomIconProps {
  name: string;
  size: number;
  color: string;
  isRounded?: boolean;
}

export const CustomIcon = ({
  name,
  size,
  color,
  isRounded,
}: CustomIconProps) => {
  let flexPosition: FlexAlignType = isRounded ? 'center' : 'flex-start';
  return (
    <View style={[styles.fs, { alignSelf: flexPosition }]}>
      <Pressable
        style={isRounded && styles.round}
        onPress={() => {
          Alert.alert('Icon Pressed!');
        }}>
        <Icon name={name} size={size} color={color} />
      </Pressable>
    </View>
  );
};
