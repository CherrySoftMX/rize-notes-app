import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import { LineChart, Grid, PieChart } from 'react-native-svg-charts';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { CardContainer } from '@atoms/CardContainer';
import { Flex, Box, HStack, VStack } from '@react-native-material/core';
import { styles } from './StatisticsScreen.style';
import { spacing } from '../../design/tokens';

const data = [10, 5, 1, 0, 4, 0, 0, 18, 3];
const pieData = [
  {
    value: 36,
    svg: {
      fill: '#0A8877',
    },
    key: 'pie-text',
  },
  {
    value: 68,
    svg: {
      fill: '#EE786B',
    },
    key: 'pie-links',
  },
];

export const StatisticsScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ScreenTitle label="Statistics summary" />
        <CardContainer>
          <Flex direction="row" style={styles.pieChartCard}>
            <View style={[styles.pieContainerSides, styles.pieContainerLabels]}>
              <VStack spacing={spacing.sm}>
                <HStack spacing={spacing.xm}>
                  <View style={[styles.circle, styles.linkColor]} />
                  <Text>Links</Text>
                </HStack>
                <HStack spacing={spacing.xm}>
                  <View style={[styles.circle, styles.textColor]} />
                  <Text>Text</Text>
                </HStack>
              </VStack>
            </View>
            <View style={styles.pieContainer}>
              <PieChart style={{ height: 130 }} data={pieData} innerRadius="60%"/>
              <View style={styles.chartLabel}>
                <Text style={styles.chartTextCount}>104</Text>
                <Text style={styles.chartTextSubtitle}>Notes</Text>
              </View>
            </View>
            <View style={[styles.pieContainerSides, styles.pieContainerLabels]}>
              <VStack spacing={spacing.sm}>
                <HStack spacing={spacing.xm}>
                  <View style={[styles.circle, styles.linkColor]} />
                  <Text>65%</Text>
                </HStack>
                <HStack spacing={spacing.xm}>
                  <View style={[styles.circle, styles.textColor]} />
                  <Text>35%</Text>
                </HStack>
              </VStack>
            </View>
          </Flex>
        </CardContainer>
        <View>
          <LineChart
            style={{ height: 200 }}
            data={data}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20 }}>
            <Grid />
          </LineChart>
        </View>
      </View>
    </SafeAreaView>
  );
};
