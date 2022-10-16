import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface MenuLabelProps {
  children: string;
}

const MenuLabel = ({children}: MenuLabelProps) => {
  return <Text style={styles.label}>{children}</Text>;
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MenuLabel;
