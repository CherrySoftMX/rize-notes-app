import { StyleSheet } from 'react-native';
import { colors } from '../../design/tokens/colors';
import { spacing, fontType, fontSize } from '../../design/tokens';

export const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.primary,
    width: '100%',
    height: '100%',
  },
  container: {
    width: '85%',
    borderRadius: 50,
    paddingTop: 50,
    paddingHorizontal: 25,
    paddingBottom: 33,
    backgroundColor: colors.pureWhite,
    marginTop: -spacing.md,
  },
  title1: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#7E7D84',
  },
  title2: {
    fontSize: fontSize.lg + 2,
    color: '#7E7D84',
    marginBottom: 35,
    fontFamily: fontType.bold,
  },
  input: {
    backgroundColor: colors.pureWhite,
    marginTop: 5,
  },
  inputFont: {
    fontFamily: fontType.regular,
  },
  stack: {
    width: '100%',
  },
  buttonLogin: {
    width: 135,
    alignSelf: 'center',
    marginTop: spacing.xm,
  },
  label: {
    fontSize: fontSize.md - 1,
    color: '#7E7D84',
    alignSelf: 'center',
    marginVertical: 5,
    fontFamily: fontType.regular,
  },
  logo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
});
