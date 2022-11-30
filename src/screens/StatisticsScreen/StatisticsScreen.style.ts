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
  halfGrow: {
    flexBasis: '50%',
  },
  wrapFlex: {
    flexWrap: 'wrap',
  },
  margin: {
    marginBottom: spacing.sm,
  },
  noDataLabel: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
