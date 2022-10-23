import { StyleSheet } from 'react-native';
import { colors } from '../../../design/tokens/colors';

export const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    height: 95,
    margin: 10,
    backgroundColor: colors.pureWhite,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 4,
  },
  icon: {
    alignSelf: 'flex-start',
  },
});
