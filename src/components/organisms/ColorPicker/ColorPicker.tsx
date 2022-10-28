import React from 'react';
import { Foldercolor } from '@atoms/FolderColor';
import { HStack } from '@react-native-material/core';
import { Pressable, View } from 'react-native';
import { colors } from '../../../design/tokens/colors';
import { useArrayNavigator } from '@hooks/useArrayNavigator';
import { useState } from 'react';

const folderColors = [
  colors.yellowishMedium,
  colors.lightGreen,
  colors.orangyRed,
  colors.lightLilac,
];

export const ColorPicker = () => {
  const { currentIndex, currentItem, setCurrentIndex } =
    useArrayNavigator<string>(folderColors, 0);

  const [isYellow, setYellow] = useState(true);
  const [isLilac, setLilac] = useState(false);
  const [isGreen, setGreen] = useState(false);
  const [isOrangy, setOrangy] = useState(false);

  return (
    <HStack m={6} spacing={6}>
      <View>
        <Pressable
          onPress={() => {
            setCurrentIndex(0);
            setYellow(true);
            setLilac(false);
            setGreen(false);
            setOrangy(false);
          }}>
          <Foldercolor
            hexColor={colors.yellowishMedium}
            isSelected={isYellow}
          />
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => {
            setCurrentIndex(1);
            setYellow(false);
            setLilac(false);
            setGreen(true);
            setOrangy(false);
          }}>
          <Foldercolor hexColor={colors.lightGreen} isSelected={isGreen} />
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => {
            setCurrentIndex(2);
            setYellow(false);
            setLilac(false);
            setGreen(false);
            setOrangy(true);
          }}>
          <Foldercolor hexColor={colors.orangyRed} isSelected={isOrangy} />
        </Pressable>
      </View>
      <View>
        <Pressable
          onPress={() => {
            setCurrentIndex(3);
            setYellow(false);
            setLilac(true);
            setGreen(false);
            setOrangy(false);
          }}>
          <Foldercolor hexColor={colors.lightLilac} isSelected={isLilac} />
        </Pressable>
      </View>
    </HStack>
  );
};
