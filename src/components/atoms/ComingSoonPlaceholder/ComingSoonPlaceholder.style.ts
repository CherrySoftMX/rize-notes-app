import { StyleSheet, Dimensions } from 'react-native';
import { colors, fontType, fontSize } from '../../../design/tokens';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: '#454545',
  },
  iconCircleBackground: {
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius:
      (Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) *
        0.7) /
      2,
  },
  iconContainer: {
    marginTop: Dimensions.get('window').width * -0.08,
  },
  title: {
    fontFamily: fontType.bold,
    fontSize: fontSize.xxl + 5,
    color: colors.pureWhite,
  },
  content: {
    fontFamily: fontType.regular,
    fontSize: fontSize.md + 1,
    color: colors.pureWhite,
    maxWidth: Dimensions.get('window').width * 0.8,
    textAlign: 'center',
  },
});
