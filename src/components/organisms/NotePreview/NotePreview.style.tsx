import { StyleSheet } from 'react-native';
import { colors } from '../../../design/tokens/colors';
import { fontSize } from '../../../design/tokens/fontSize';

export const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: colors.black,
  },
  textEllipsis: {
    fontSize: fontSize.md,
    color: colors.mediumGrey,
    fontWeight: '400',
  },
  item: {
    padding: 12,
    margin: 12,
    width: 250,
  },
});
