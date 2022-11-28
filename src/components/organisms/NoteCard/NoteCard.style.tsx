import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../design/tokens';

export const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    minHeight: 95,
    margin: 10,
    backgroundColor: colors.pureWhite,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 4,
    paddingHorizontal: spacing.xm + 2,
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
