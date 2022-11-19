import { StyleSheet } from 'react-native';
import { fontType, fontSize, spacing } from '../../../design/tokens';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontFamily: fontType.bold,
    fontSize: fontSize.md,
    marginTop: spacing.md,
  },
});
