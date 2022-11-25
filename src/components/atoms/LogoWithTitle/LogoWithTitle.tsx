import React from 'react';
import { View, Image } from 'react-native';

interface LogoWithTitleProps {
  styles?: any;
  width?: number;
  height?: number;
}

export const LogoWithTitle = ({
  styles = {},
  width = 150,
  height = 72,
}: LogoWithTitleProps) => {
  return (
    <View style={styles}>
      <Image
        source={require('@assets/logoWithTitle.png')}
        style={{
          width,
          height,
        }}
      />
    </View>
  );
};
