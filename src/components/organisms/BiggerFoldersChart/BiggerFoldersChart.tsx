import React from 'react';
import { CardContainer } from '@atoms/CardContainer';
import { LabelWithCircle } from '@atoms/LabelWithCircle/LabelWithCircle';
import { BarChart, Grid } from 'react-native-svg-charts';
import { VStack, Flex } from '@react-native-material/core';
import { View, Text } from 'react-native';
import { spacing, colors } from '../../../design/tokens';
import { styles } from '@screens/StatisticsScreen/StatisticsScreen.style';
import { BarChartLabel } from '@atoms/BarChartLabel';
import { When } from 'react-if';

interface ChartData {
  value: number;
  label: string;
  svg: {
    fill: string;
  };
  key: string;
}

interface BiggerFoldersChartProps {
  data: Array<ChartData>;
}

export const labelColors: Array<string> = [
  colors.lightGreen,
  colors.orangyRed,
  colors.lightLilac,
  colors.yellowishMedium,
];

export const BiggerFoldersChart = ({ data = [] }: BiggerFoldersChartProps) => {
  return (
    <CardContainer style={{ paddingVertical: spacing.md + 5 }}>
      <VStack spacing={spacing.sm}>
        <Flex direction="row" style={styles.wrapFlex}>
          {data.map((d, index) => (
            <View
              key={index}
              style={[
                styles.dataCardContainer,
                styles.halfGrow,
                index < 2 && data.length > 2 ? styles.margin : {},
              ]}>
              <LabelWithCircle label={d.label} color={labelColors[index]} />
            </View>
          ))}
        </Flex>
        <View>
          <BarChart
            horizontal
            style={{ height: 130, flex: 1 }}
            spacingInner={0.3}
            spacingOuter={0.4}
            data={data}
            yAccessor={({ item }) => item.value}
            svg={{ fill: colors.primary }}
            gridMin={0}>
            <Grid direction="VERTICAL" />
            {data.map((v: any, i: number) => (
              <BarChartLabel key={i} value={v.value} index={i} />
            ))}
          </BarChart>
          <When condition={data.length === 0}>
            <View style={styles.noDataLabel}>
              <Text>There isn't enough data</Text>
            </View>
          </When>
          <Flex center>
            <Text style={styles.chartLabel}>Notes per folder</Text>
          </Flex>
        </View>
      </VStack>
    </CardContainer>
  );
};
