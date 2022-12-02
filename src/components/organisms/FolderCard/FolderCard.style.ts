import { StyleSheet } from 'react-native';
import { colors, fontType } from '../../../design/tokens';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12,
  },
  title: {
    fontSize: 15,
    color: colors.black,
    fontFamily: fontType.bold,
  },
  subtitle: {
    fontSize: 12,
    color: colors.mediumGrey,
    fontFamily: fontType.regular,
  },
});
