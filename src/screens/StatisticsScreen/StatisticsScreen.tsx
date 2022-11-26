import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { styles } from './StatisticsScreen.style';
import { PieChartCard } from '@organisms/PieChartCard/';
import { VStack, HStack } from '@react-native-material/core';
import { spacing, colors } from '../../design/tokens';
import { DataCard } from '@molecules/DataCard';
import { AntiquityFilterOptionsList } from '@molecules/AntiquityFilterOptionsList';
import { ScreenHeader } from '@organisms/ScreenHeader';
import { LineChartCard } from '@organisms/LineChartCard';
import { BiggerFoldersChart } from '@organisms/BiggerFoldersChart';
import { useRecoilValue } from 'recoil';
import { foldersState } from '../../library/state/foldersState';

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

const barChartData = [
  {
    value: 32,
    label: 'School',
    svg: {
      fill: colors.lightGreen,
      opacity: 0.9,
    },
    key: 'folder1',
  },
  {
    value: 27,
    label: 'Videogames',
    svg: {
      fill: colors.orangyRed,
      opacity: 0.9,
    },
    key: 'folder2',
  },
  {
    value: 19,
    label: 'Tutorials',
    svg: {
      fill: colors.lightLilac,
      opacity: 0.9,
    },
    key: 'folder3',
  },
  {
    value: 16,
    label: 'News',
    svg: {
      fill: colors.yellowishMedium,
      opacity: 0.9,
    },
    key: 'folder4',
  },
];

const lineChartData = [5, 6, 2, 4, 3, 10, 8];
const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const StatisticsScreen = () => {
  const folders = useRecoilValue(foldersState);
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
                <DataCard label="Folders" value={folders.length} />
              </View>
            </HStack>
            <View style={styles.sectionTitle}>
              <ScreenTitle label="Bigger folders" align="flex-start" />
            </View>
            <View>
              <BiggerFoldersChart data={barChartData} />
            </View>
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
