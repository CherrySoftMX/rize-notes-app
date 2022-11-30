import React from 'react';
import { Text, View } from 'react-native';
import { CardContainer } from '@atoms/CardContainer';
import { ChartVerticalLine } from '@atoms/ChartVerticalLine';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { VStack, Flex } from '@react-native-material/core';
import { spacing, colors } from '../../../design/tokens';
import { styles } from './LineChartCard.style';

const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 15, left: 10, right: 10 };
const xAxisHeight = 30;

interface LineChartCardProps {
  data: Array<number>;
  labels: Array<string | number>;
}

export const LineChartCard = ({
  data = [],
  labels = [],
}: LineChartCardProps) => {
  return (
    <CardContainer vPadding={spacing.lg}>
      <VStack spacing={spacing.xm}>
        <View style={styles.lineChartContainer}>
          <YAxis
            data={[...data, 0]}
            style={{ marginBottom: xAxisHeight / 2 }}
            contentInset={verticalContentInset}
            svg={axesSvg}
          />
          <View style={styles.lineChartContainerHorizontal}>
            <LineChart
              style={styles.lineChart}
              data={data}
              contentInset={verticalContentInset}
              gridMin={0}
              svg={{ stroke: colors.primary, strokeWidth: 2 }}>
              <Grid />
              {data.map((_, i) => (
                <ChartVerticalLine key={i} index={i} />
              ))}
            </LineChart>
            <XAxis
              style={styles.lineChartHorizontalLabel}
              data={data}
              formatLabel={(value, index) => labels[index]}
              contentInset={{ left: 20, right: 20 }}
              svg={axesSvg}
            />
          </View>
        </View>
        <Flex center>
          <Text style={styles.chartLabel}>Notes created per day</Text>
        </Flex>
      </VStack>
    </CardContainer>
  );
};
