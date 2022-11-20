import { StyleSheet } from 'react-native';
import { spacing, colors, fontType, fontSize } from '../../design/tokens/';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: spacing.sm + 1,
  },
  pieChartCard: {
    justifyContent: 'space-between',
  },
  pieContainer: {
    flexBasis: '50%',
  },
  pieContainerSides: {
    flexBasis: '25%',
  },
  pieContainerLabels: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartTextCount: {
    color: colors.eerieBlack,
    textAlign: 'center',
    fontFamily: fontType.bold,
    fontSize: fontSize.xl,
  },
  chartTextSubtitle: {
    marginTop: -spacing.tiny,
  },
  circle: {
    width: fontSize.lg,
    height: fontSize.lg,
    borderRadius: fontSize.lg / 2,
  },
  linkColor: {
    backgroundColor: '#EE786B',
  },
  textColor: {
    backgroundColor: '#0A8877',
  },
});
