import React from 'react';
import { View } from 'react-native';
import { styles } from './CardContainer.style';

interface CardContainerProps {
  children: React.ReactChild;
}

export const CardContainer = ({ children }: CardContainerProps) => {
  return <View style={styles.container}>{children}</View>;
};
