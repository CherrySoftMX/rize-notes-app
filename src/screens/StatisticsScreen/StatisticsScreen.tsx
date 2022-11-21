import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, Text } from 'react-native';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { styles } from './StatisticsScreen.style';
import { PieChartCard } from '@organisms/PieChartCard/';
import { VStack, HStack, Flex } from '@react-native-material/core';
import { spacing } from '../../design/tokens';
import { DataCard } from '@molecules/DataCard';
import { AntiquityFilterOptionsList } from '@molecules/AntiquityFilterOptionsList';
import { ScreenHeader } from '@organisms/ScreenHeader';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { CardContainer } from '@atoms/CardContainer';
import { ChartVerticalLine } from '@atoms/ChartVerticalLine';

const lineChartData = [5, 7, 3, 4, 9, 10, 2];
const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 };
const xAxisHeight = 30;

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
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <ScreenHeader title="Statistics summary" mHorizontalSearchBar={0}>
              <AntiquityFilterOptionsList mHorizontal={0} />
            </ScreenHeader>
          </View>
          <VStack spacing={spacing.sm}>
            <View>
              <PieChartCard
                data={pieData}
                numText={pieData[0].value}
                numLinks={pieData[1].value}
              />
            </View>
            <View style={styles.sectionTitle}>
              <ScreenTitle label="Total quantities" align="flex-start" />
            </View>
            <HStack spacing={spacing.sm}>
              <View style={styles.dataCardContainer}>
                <DataCard label="Text notes" value={`${pieData[0].value}`} />
              </View>
              <View style={styles.dataCardContainer}>
                <DataCard label="Link notes" value={`${pieData[1].value}`} />
              </View>
            </HStack>
            <HStack spacing={spacing.sm}>
              <View style={styles.dataCardContainer}>
                <DataCard label="Favorites" value="27" />
              </View>
              <View style={styles.dataCardContainer}>
                <DataCard label="Folders" value="18" />
              </View>
            </HStack>
            <View style={styles.sectionTitle}>
              <ScreenTitle label="Weekly activity" align="flex-start" />
            </View>
            <CardContainer vPadding={spacing.lg}>
              <VStack spacing={spacing.xm}>
                <View style={styles.lineChartContainer}>
                  <YAxis
                    data={lineChartData}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                  />
                  <View style={styles.lineChartContainerHorizontal}>
                    <LineChart
                      style={styles.lineChart}
                      data={lineChartData}
                      contentInset={verticalContentInset}
                      svg={{ stroke: 'rgb(134, 65, 244)' }}>
                      <Grid direction="BOTH" />
                      <ChartVerticalLine index={1} />
                    </LineChart>
                    <XAxis
                      style={styles.lineChartHorizontalLabel}
                      data={lineChartData}
                      formatLabel={(value, index) => daysOfTheWeek[index]}
                      contentInset={{ left: 10, right: 10 }}
                      svg={axesSvg}
                    />
                  </View>
                </View>
                <Flex center>
                  <Text>Notes created per day</Text>
                </Flex>
              </VStack>
            </CardContainer>
          </VStack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
