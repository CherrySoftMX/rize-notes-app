import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { styles } from './StatisticsScreen.style';
import { PieChartCard } from '@organisms/PieChartCard/';
import { VStack, HStack } from '@react-native-material/core';
import { spacing } from '../../design/tokens';
import { DataCard } from '@molecules/DataCard';
import { ScreenHeader } from '@organisms/ScreenHeader';
import { LineChartCard } from '@organisms/LineChartCard';
import { BiggerFoldersChart } from '@organisms/BiggerFoldersChart';
import { useRecoilValue } from 'recoil';
import { statisticsData } from '../../library/state/statisticsState';
import { ScreenWrapper } from '@atoms/ScreenWrapper';

export const StatisticsScreen = () => {
  const {
    totalNumFolders,
    numLinkNotes,
    numTextNotes,
    numFavorites,
    pieChartData,
    barChartData,
    lineChartData,
    lineChartDataLabels,
  } = useRecoilValue(statisticsData);

  return (
    <SafeAreaView>
      <ScreenWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <ScreenHeader
                title="Statistics summary"
                showAntiquityFilterOptions={true}
              />
            </View>
            <VStack spacing={spacing.xm}>
              <View>
                <PieChartCard
                  data={pieChartData}
                  numText={numTextNotes}
                  numLinks={numLinkNotes}
                />
              </View>
              <View style={styles.sectionTitle}>
                <ScreenTitle label="General summary" align="flex-start" />
              </View>
              <HStack spacing={spacing.sm}>
                <View style={styles.dataCardContainer}>
                  <DataCard label="Text notes" value={numTextNotes} />
                </View>
                <View style={styles.dataCardContainer}>
                  <DataCard label="Link notes" value={numLinkNotes} />
                </View>
              </HStack>
              <HStack spacing={spacing.sm}>
                <View style={styles.dataCardContainer}>
                  <DataCard label="Favorites" value={numFavorites} />
                </View>
                <View style={styles.dataCardContainer}>
                  <DataCard label="Folders" value={totalNumFolders} />
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
              <LineChartCard
                data={lineChartData}
                labels={lineChartDataLabels}
              />
            </VStack>
          </View>
        </ScrollView>
      </ScreenWrapper>
    </SafeAreaView>
  );
};
