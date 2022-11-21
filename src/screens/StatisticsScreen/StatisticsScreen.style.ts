import { StyleSheet } from 'react-native';
import { spacing } from '../../design/tokens/';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  headerContainer: {
    marginBottom: spacing.xm,
  },
  sectionTitle: {
    marginTop: spacing.sm,
  },
  dataCardContainer: {
    flex: 1 / 2,
  },
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
});
