import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView, Dimensions, Text } from 'react-native';
import { ScreenTitle } from '@atoms/ScreenTitle';
import { styles } from './StatisticsScreen.style';
import { PieChartCard } from '@organisms/PieChartCard/';
import { VStack, HStack, Flex } from '@react-native-material/core';
import { spacing, colors } from '../../design/tokens';
import { DataCard } from '@molecules/DataCard';
import { AntiquityFilterOptionsList } from '@molecules/AntiquityFilterOptionsList';
import { ScreenHeader } from '@organisms/ScreenHeader';
import { LineChartCard } from '@organisms/LineChartCard';
import { CardContainer } from '@atoms/CardContainer';
import { LabelWithCircle } from '@atoms/LabelWithCircle/LabelWithCircle';
import { BarChart, Grid } from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';

const lineChartData = [5, 6, 2, 4, 3, 10, 8];
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

const fill = 'rgb(134, 65, 244)';
const barChartData = [
  {
    value: 34,
    svg: {
      fill: colors.lightGreen,
      opacity: 0.9,
    },
    key: 'folder1',
  },
  {
    value: 25,
    svg: {
      fill: colors.orangyRed,
      opacity: 0.9,
    },
    key: 'folder2',
  },
  {
    value: 19,
    svg: {
      fill: colors.lightLilac,
      opacity: 0.9,
    },
    key: 'folder3',
  },
  {
    value: 16,
    svg: {
      fill: colors.yellowishMedium,
      opacity: 0.9,
    },
    key: 'folder4',
  },
];
const CUT_OFF = Dimensions.get('window').width * 0.7;

export const Label = ({x, y, bandwidth, value, index}) => {
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
              <ScreenTitle label="Bigger folders" align="flex-start" />
            </View>
            <View>
              <CardContainer vPadding={spacing.md + 5}>
                <VStack spacing={spacing.sm}>
                  <Flex direction="row">
                    <View style={styles.dataCardContainer}>
                      <LabelWithCircle
                        label="School"
                        color={colors.lightGreen}
                      />
                    </View>
                    <View style={styles.dataCardContainer}>
                      <LabelWithCircle
                        label="Videogames"
                        color={colors.orangyRed}
                      />
                    </View>
                  </Flex>
                  <Flex direction="row">
                    <View style={styles.dataCardContainer}>
                      <LabelWithCircle
                        label="Tutorials"
                        color={colors.lightLilac}
                      />
                    </View>
                    <View style={styles.dataCardContainer}>
                      <LabelWithCircle
                        label="News"
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
                      data={barChartData}
                      yAccessor={({ item }) => item.value}
                      svg={{ fill }}
                      gridMin={0}>
                      <Grid direction="VERTICAL" />
                      {barChartData.map((value, i) => (
                        <Label key={i} value={value.value} index={i} />
                      ))}
                    </BarChart>
                    <Flex center>
                      <Text>Notes per folder</Text>
                    </Flex>
                  </View>
                </VStack>
              </CardContainer>
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
