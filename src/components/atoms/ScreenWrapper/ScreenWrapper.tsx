import React from 'react';
import { View } from 'react-native';
import { styles } from '@atoms/ScreenWrapper/ScreenWrapper.style';

interface ScreenWrapperProps {
  children: React.ReactChild | React.ReactChild[];
}

export const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
  return <View style={styles.container}>{children}</View>;
};
