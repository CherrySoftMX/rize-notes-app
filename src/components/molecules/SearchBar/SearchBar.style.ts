import { StyleSheet } from 'react-native';
import { border, colors } from '../../../design/tokens';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textInput: {
    flex: 1,
  },
  leadingFilterButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 1,
    borderBottomLeftRadius: border.radius.sm,
    borderTopLeftRadius: border.radius.sm,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  trailingSearchButton: {
    borderRadius: 1,
    borderTopRightRadius: border.radius.sm,
    borderBottomRightRadius: border.radius.sm,
  },
});
