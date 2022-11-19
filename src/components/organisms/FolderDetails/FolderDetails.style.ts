import { StyleSheet } from 'react-native';
import { colors, fontSize, spacing, fontType } from '../../../design/tokens';

export const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.xl,
    textAlign: 'center',
    color: colors.darkGunmetal,
    padding: 6,
    fontFamily: fontType.bold,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: fontSize.md,
    color: colors.mediumGrey,
    fontFamily: fontType.regular,
    marginTop: spacing.tiny,
  },
  titleContainer: {
    paddingHorizontal: spacing.md,
    minWidth: '75%',
    maxWidth: '75%',
    overflow: 'hidden',
    flexGrow: 2,
  },
  headerContainer: {
    justifyContent: 'center',
  },
  barContainer: {
    marginTop: spacing.sm,
  },
  container: {
    paddingHorizontal: spacing.md + 5,
    paddingBottom: spacing.md,
    paddingTop: spacing.md,
    overflow: 'hidden',
  },
  folderIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  menuIcon: {
    position: 'absolute',
    top: 0 - spacing.md,
    right: 0 - spacing.md - 5,
  },
});
