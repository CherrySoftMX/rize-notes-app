import React from 'react';
import { Text } from 'react-native';
import { styles } from '@atoms/ScreenTitle/ScreenTitle.style';

interface ScreenTitleProps {
  label: string;
}

export const ScreenTitle = ({ label }: ScreenTitleProps) => {
  return <Text style={styles.label}>{label}</Text>;
};
