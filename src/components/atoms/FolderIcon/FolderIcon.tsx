import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { colors } from '../../../design/tokens';
import { View } from 'react-native';

interface FolderIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const secondaryFolderColors: { [key: string]: string } = {
  '#FEB95A': '#A97124',
  '#1FC0A9': '#0A8877',
  '#EE786B': '#C44B3F',
  '#F2C8ED': '#C47FBD',
};

export const FolderIcon = ({
  width = 48,
  height = 41,
  color = colors.yellowishMedium,
}: FolderIconProps) => {
  return (
    <View>
      <Svg width={width} height={height} viewBox="0 0 48 41" fill="none">
        <Path
          d="M6.5 4V6.08696V11C6.5 12.6569 7.84315 14 9.5 14H40.5C42.1569 14 43.5 12.6569 43.5 11V4C43.5 2.34315 42.1569 1 40.5 1H9.5C7.84315 1 6.5 2.34314 6.5 4Z"
          fill={secondaryFolderColors[color]}
          stroke={secondaryFolderColors[color]}
        />
        <Path
          d="M1 37V8.00001C1 6.34315 2.34043 5 3.99729 5L15 5C18.5871 4.99999 20.387 7.50192 21.2546 9.51425C21.8457 10.8852 23.1089 12 24.6019 12H44C45.6569 12 47 13.3432 47 15V37C47 38.6569 45.6569 40 44 40H4C2.34315 40 1 38.6569 1 37Z"
          fill={color}
          stroke={color}
        />
      </Svg>
    </View>
  );
};
