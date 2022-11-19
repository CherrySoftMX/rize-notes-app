import { StyleSheet } from 'react-native';
import { colors } from '../../../design/tokens/colors';
import { fontSize, fontType } from '../../../design/tokens';

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
  item: {
    padding: 10,
    margin: 2,
  },
});
