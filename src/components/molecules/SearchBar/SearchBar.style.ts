import { StyleSheet } from 'react-native';
import { border, colors, fontSize, fontType } from '../../../design/tokens';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    paddingVertical: 5,
    height: 40,
    fontFamily: fontType.regular,
    fontSize: fontSize.md,
  },
  leadingFilterButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 1,
    borderBottomLeftRadius: border.radius.md,
    borderTopLeftRadius: border.radius.md,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  trailingSearchButton: {
    borderRadius: 1,
    borderTopRightRadius: border.radius.md,
    borderBottomRightRadius: border.radius.md,
    width: 40,
    height: 40,
  },
  searchBarShadow: {
    backgroundColor: colors.pureWhite,
    marginHorizontal: 10,
    borderRadius: border.radius.md,
  },
});
