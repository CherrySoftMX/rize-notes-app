import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { Text as SvgText } from 'react-native-svg';
import { colors } from '../../../design/tokens';

interface BarChartLabelProps {
  x?: (arg: any) => any;
  y?: (arg: any) => any;
  bandwidth?: number;
  value: number;
  index: number;
}

export const BarChartLabel = ({
  x = () => {},
  y = () => {},
  bandwidth = 0,
  value,
  index,
}: BarChartLabelProps) => {
  const CUT_OFF = useMemo(() => Dimensions.get('window').width * 0.7, []);
  return (
    <SvgText
      key={index}
      x={x(value) > CUT_OFF ? x(value) - 30 : x(value) + 10}
      y={y(index) + bandwidth / 2}
      fontSize={14}
      fill={colors.eerieBlack}
      alignmentBaseline="middle">
      {value}
    </SvgText>
  );
};
