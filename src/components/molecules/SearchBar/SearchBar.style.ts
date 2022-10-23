import { StyleSheet } from 'react-native';
import { colors } from '../../../design/tokens';
import { border } from '../../../design/tokens';

export const styles = StyleSheet.create({
  textInput: {
    flex: 1,
  },
  leadingFilterButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 1,
    borderBottomLeftRadius: border.radius,
    borderTopLeftRadius: border.radius,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  trailingSearchButton: {
    borderRadius: 1,
    borderTopRightRadius: border.radius,
    borderBottomRightRadius: border.radius,
  },
});
