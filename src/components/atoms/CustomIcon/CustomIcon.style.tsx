import { colors } from '../../../design/tokens/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  round: {
    backgroundColor: colors.mediumGrey,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 5,
  },
  fs: {
    margin: 2,
    padding: 2,
  },
});
