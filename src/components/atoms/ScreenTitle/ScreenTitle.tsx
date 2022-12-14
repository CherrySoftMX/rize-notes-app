import React from 'react';
import { Text } from 'react-native';
import { styles } from '@atoms/ScreenTitle/ScreenTitle.style';

interface ScreenTitleProps {
  label: string | number;
  align?: 'flex-start' | 'center';
}

export const ScreenTitle = ({ label, align = 'center' }: ScreenTitleProps) => {
  return <Text style={[styles.label, { alignSelf: align }]}>{label}</Text>;
};
