import React, { useState } from 'react';
import { Alert, Pressable, View } from 'react-native';
import { styles } from './Color.style';
import { ColorProps } from './Props';

export const Color = ({ hex }: ColorProps) => {
  const [color, setcolor] = useState(hex);
  return (
    <Pressable
      onPress={() => {
        setcolor(hex);
        Alert.alert(`HEX CODE: ${color}`);
      }}>
      <View style={[styles.dimension, { backgroundColor: hex }]} />
    </Pressable>
  );
};
