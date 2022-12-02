import { StyleSheet } from 'react-native';
import { colors } from '../../../design/tokens';
import { fontSize, fontType, spacing } from '../../../design/tokens';

export const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: colors.black,
    fontFamily: fontType.bold,
  },
  textEllipsis: {
    marginTop: 2,
    fontSize: fontSize.md,
    color: colors.mediumGrey,
    fontFamily: fontType.regular,
  },
  textContainer: {
    width: '100%',
    marginLeft: spacing.xm,
    overflow: 'hidden',
    flexWrap: 'nowrap',
    maxWidth: '63%',
  },
});
