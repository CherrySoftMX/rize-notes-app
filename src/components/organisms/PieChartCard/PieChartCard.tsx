import React from 'react';
import { Text, View } from 'react-native';
import { CardContainer } from '@atoms/CardContainer';
import { PieChart } from 'react-native-svg-charts';
import { Flex, VStack } from '@react-native-material/core';
import { LabelWithCircle } from '@atoms/LabelWithCircle/LabelWithCircle';
import { styles } from './PieChartCard.style';
import { spacing } from '../../../design/tokens';

interface PieData {
  value: number;
  key: string;
  svg: {
    fill: string;
  };
}

interface PieChartCardProps {
  data: Array<PieData>;
  numText: number;
  numLinks: number;
}

export const PieChartCard = ({
  data,
  numText,
  numLinks,
}: PieChartCardProps) => {
  return (
    <CardContainer style={{ paddingVertical: spacing.md, marginTop: -10 }}>
      <Flex direction="row" style={styles.pieChartCard}>
        <View
          style={[
            styles.pieContainerSides,
            styles.pieContainerLabels,
            styles.leftLabels,
          ]}>
          <VStack spacing={spacing.sm}>
            <View>
              <LabelWithCircle
                label="Links"
                color={styles.linkColor.backgroundColor}
              />
            </View>
            <View>
              <LabelWithCircle
                label="Text"
                color={styles.textColor.backgroundColor}
              />
            </View>
          </VStack>
        </View>
        <View style={styles.pieContainer}>
          <PieChart style={{ height: 130 }} data={data} innerRadius="60%" />
          <View style={styles.chartLabel}>
            <Text style={styles.chartTextCount}>{numLinks + numText}</Text>
            <Text style={styles.chartTextSubtitle}>Notes</Text>
          </View>
        </View>
        <View
          style={[
            styles.pieContainerSides,
            styles.pieContainerLabels,
            styles.rightLabels,
          ]}>
          <VStack spacing={spacing.sm}>
            <View>
              <LabelWithCircle
                label={
                  numLinks + numText !== 0
                    ? `${Math.floor((numLinks * 100) / (numLinks + numText))}%`
                    : '0'
                }
                color={styles.linkColor.backgroundColor}
              />
            </View>
            <View>
              <LabelWithCircle
                label={
                  numLinks + numText !== 0
                    ? `${Math.ceil((numText * 100) / (numLinks + numText))}%`
                    : '0'
                }
                color={styles.textColor.backgroundColor}
              />
            </View>
          </VStack>
        </View>
      </Flex>
    </CardContainer>
  );
};
