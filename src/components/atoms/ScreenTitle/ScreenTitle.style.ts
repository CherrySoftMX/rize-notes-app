import { StyleSheet } from 'react-native';
import { colors, fontSize } from '../../../design/tokens';
import { fontType } from '../../../design/tokens';

export const styles = StyleSheet.create({
  label: {
    color: colors.darkGunmetal,
    fontSize: fontSize.xl,
    alignSelf: 'center',
    fontFamily: fontType.bold,
  },
});
