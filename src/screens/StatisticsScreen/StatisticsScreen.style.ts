import { StyleSheet } from 'react-native';
import { spacing, fontType } from '../../design/tokens/';

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
  chartLabel: {
    fontFamily: fontType.bold,
    marginTop: spacing.xm,
  },
});
