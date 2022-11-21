import React from 'react';
import { Text } from 'react-native';
import { styles } from '@atoms/ScreenTitle/ScreenTitle.style';

interface ScreenTitleProps {
  label: string;
  align?: string;
}

export const ScreenTitle = ({ label, align = 'center' }: ScreenTitleProps) => {
  return <Text style={[styles.label, { alignSelf: align }]}>{label}</Text>;
};
