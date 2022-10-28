import { StyleSheet } from 'react-native';
import { border, colors } from '../../../design/tokens';

export const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 8,
    paddingVertical: 3,
  },
  defaultLabel: {
    borderRadius: border.radius.xl,
    paddingVertical: 5,
    paddingHorizontal: 18,
    color: colors.darkGunmetal,
    backgroundColor: colors.pureWhite,
  },
  defaultText: {
    color: colors.darkGunmetal,
    fontWeight: '600',
  },
  selectedLabel: {
    color: colors.pureWhite,
    backgroundColor: colors.primary,
  },
  selectedText: {
    color: colors.pureWhite,
  },
});
