import { StyleSheet } from 'react-native';
import { colors } from '../../../design/tokens';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pureWhite,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 4,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
});
