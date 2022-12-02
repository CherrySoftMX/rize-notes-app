import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styles } from './CardContainer.style';

interface CardContainerProps {
  children: React.ReactChild | React.ReactChild[];
  style?: StyleProp<ViewStyle>;
}

export const CardContainer = ({ children, style }: CardContainerProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};
