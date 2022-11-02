import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { fontSize, fontType } from '../../../design/tokens';

interface MenuLabelProps {
  children: string;
}

export const MenuLabel = ({ children }: MenuLabelProps) => {
  return <Text style={styles.label}>{children}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: fontSize.md,
    fontFamily: fontType.bold,
  },
});
