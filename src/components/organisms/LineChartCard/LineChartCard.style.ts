import { StyleSheet } from 'react-native';
import { spacing, fontType } from '../../../design/tokens/';

export const styles = StyleSheet.create({
  lineChartContainer: {
    height: 200,
    flexDirection: 'row',
  },
  lineChartContainerHorizontal: {
    flex: 1,
    marginLeft: spacing.xm,
  },
  lineChart: {
    flex: 1,
  },
  lineChartHorizontalLabel: {
    marginHorizontal: -10,
  },
  chartLabel: {
    fontFamily: fontType.bold,
  },
});
