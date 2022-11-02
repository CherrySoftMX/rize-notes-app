import { StyleSheet } from 'react-native';
import { colors, fontSize } from '../../../design/tokens';

export const styles = StyleSheet.create({
  container: {
    margin: 12,
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
    fontSize: fontSize.md,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: colors.black,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.mediumGrey,
    fontWeight: '400',
  },
});
