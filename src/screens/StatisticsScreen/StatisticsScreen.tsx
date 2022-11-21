import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { styles } from './StatisticsScreen.style';
import { PieChartCard } from '@organisms/PieChartCard/';
import { VStack, HStack } from '@react-native-material/core';
import { spacing } from '../../design/tokens';
import { DataCard } from '@molecules/DataCard';
import { AntiquityFilterOptionsList } from '@molecules/AntiquityFilterOptionsList';
import { ScreenHeader } from '@organisms/ScreenHeader';
import { LineChartCard } from '@organisms/LineChartCard';

const lineChartData = [5, 6, 2, 4, 8, 10, 8];
const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
            <LineChartCard data={lineChartData} labels={daysOfTheWeek} />
          </VStack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
