import { colors } from '../../../design/tokens/colors';
import { fontSize } from '../../../design/tokens/fontSize';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    width: '50%',
    height: 170,
    margin: 10,
    backgroundColor: colors.pureWhite,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 4,
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
  icon: {
    alignSelf: 'flex-start',
    marginHorizontal: 18,
    marginRight: 5,
  },
});