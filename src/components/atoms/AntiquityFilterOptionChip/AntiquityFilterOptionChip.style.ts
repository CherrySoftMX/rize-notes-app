import { StyleSheet } from 'react-native';
import { border, colors } from '../../../design/tokens';

export const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 3,
    marginRight: 8,
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
