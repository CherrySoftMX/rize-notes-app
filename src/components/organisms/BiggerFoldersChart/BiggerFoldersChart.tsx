import React from 'react';
import { CardContainer } from '@atoms/CardContainer';
import { LabelWithCircle } from '@atoms/LabelWithCircle/LabelWithCircle';
import { BarChart, Grid } from 'react-native-svg-charts';
import { VStack, Flex } from '@react-native-material/core';
import { View, Text } from 'react-native';
import { spacing, colors } from '../../../design/tokens';
import { styles } from '@screens/StatisticsScreen/StatisticsScreen.style';
import { BarChartLabel } from '@atoms/BarChartLabel';

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

export const BiggerFoldersChart = ({ data }: BiggerFoldersChartProps) => {
  return (
    <CardContainer vPadding={spacing.md + 5}>
      <VStack spacing={spacing.sm}>
        <Flex direction="row">
          <View style={styles.dataCardContainer}>
            <LabelWithCircle label={data[0]?.label} color={colors.lightGreen} />
          </View>
          <View style={styles.dataCardContainer}>
            <LabelWithCircle label={data[1]?.label} color={colors.orangyRed} />
          </View>
        </Flex>
        <Flex direction="row">
          <View style={styles.dataCardContainer}>
            <LabelWithCircle label={data[2]?.label} color={colors.lightLilac} />
          </View>
          <View style={styles.dataCardContainer}>
            <LabelWithCircle
              label={data[3]?.label}
              color={colors.yellowishMedium}
            />
          </View>
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
          <Flex center>
            <Text style={styles.chartLabel}>Notes per folder</Text>
          </Flex>
        </View>
      </VStack>
    </CardContainer>
  );
};
