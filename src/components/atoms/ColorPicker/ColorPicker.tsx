import React from 'react';
import { Color } from './Color/Color';
import { HStack } from '@react-native-material/core';
import { ColorProps } from './Color/Props';
import { View } from 'react-native';

interface FolderColors {
  hexColors: ColorProps[];
}

export const ColorPicker = ({ hexColors }: FolderColors) => {
  return (
    <HStack m={5} spacing={6}>
      {hexColors.map((item, index) => (
        <View key={index}>
          <Color hex={item.hex} />
        </View>
      ))}
    </HStack>
  );
};
