import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface MenuLabelProps {
  children: string;
}

export const MenuLabel = ({ children }: MenuLabelProps) => {
  return <Text style={styles.label}>{children}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
