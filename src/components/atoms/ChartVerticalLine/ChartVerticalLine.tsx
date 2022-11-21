import React from 'react';
import { Line } from 'react-native-svg';

interface ChartVerticalLineProps {
  x?: (arg: any) => any;
  index: number;
}

export const ChartVerticalLine = ({
  x = () => {},
  index,
}: ChartVerticalLineProps) => {
  return (
    <Line
      key="My-key"
      y1={'0%'}
      y2={'100%'}
      x1={x(index)}
      x2={x(index)}
      strokeWidth={1}
      stroke={'rgba(0,0,0,0.2)'}
    />
  );
};
