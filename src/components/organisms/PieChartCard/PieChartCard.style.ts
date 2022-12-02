import { StyleSheet } from 'react-native';
import { spacing, colors, fontType, fontSize } from '../../../design/tokens/';

export const styles = StyleSheet.create({
  pieChartCard: {
    justifyContent: 'space-between',
  },
  pieContainer: {
    flexBasis: '50%',
  },
  pieContainerSides: {
    flexBasis: '25%',
  },
  leftLabels: {
    paddingLeft: 20,
  },
  rightLabels: {
    paddingRight: 20,
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
  linkColor: {
    backgroundColor: '#EE786B',
  },
  textColor: {
    backgroundColor: '#0A8877',
  },
});
