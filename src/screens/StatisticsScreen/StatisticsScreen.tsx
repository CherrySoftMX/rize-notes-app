import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { styles } from './StatisticsScreen.style';
import { PieChartCard } from '@organisms/PieChartCard/';
import { VStack } from '@react-native-material/core';
import { spacing } from '../../design/tokens';

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
        <VStack spacing={spacing.sm}>
          <View>
            <ScreenTitle label="Statistics summary" />
          </View>
          <View>
            <PieChartCard
              data={pieData}
              numText={pieData[0].value}
              numLinks={pieData[1].value}
            />
          </View>
        </VStack>
      </View>
    </SafeAreaView>
  );
};
