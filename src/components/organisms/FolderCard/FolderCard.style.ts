import { StyleSheet } from 'react-native';
import { colors, fontType } from '../../../design/tokens';

export const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: colors.pureWhite,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 4,
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
