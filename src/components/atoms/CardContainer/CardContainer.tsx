import React from 'react';
import { View } from 'react-native';
import { styles } from './CardContainer.style';

interface CardContainerProps {
  children: React.ReactChild;
  vPadding?: number;
}

export const CardContainer = ({ children, vPadding }: CardContainerProps) => {
  return (
    <View
      style={[styles.container, vPadding ? { paddingVertical: vPadding } : {}]}>
      {children}
    </View>
  );
};
