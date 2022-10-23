import React from 'react';
import { Box, HStack } from '@react-native-material/core';
import { View } from 'react-native';
import StyleSheetFactory from './HairLine.style';

interface HairLineProps {
  w?: number | string;
  h?: number | string;
  color: string;
}

export const HairLine = ({ w, h, color }: HairLineProps) => {
  let style = StyleSheetFactory.getSheet(color);
  return (
    <View>
      <HStack fill>
        <Box w={w} h={h} ml={0.5} style={style.border} />
      </HStack>
    </View>
  );
};
