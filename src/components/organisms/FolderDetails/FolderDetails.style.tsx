import { StyleSheet } from 'react-native';
import { colors, fontSize } from '../../../design/tokens';

export const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: fontSize.xxl,
    textAlign: 'center',
    color: colors.darkGunmetal,
    padding: 6,
  },
  subtitle: {
    fontWeight: '400',
    fontSize: fontSize.lg,
    color: colors.mediumGrey,
    textAlign: 'center',
  },
});
