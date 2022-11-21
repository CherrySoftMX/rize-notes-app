import { StyleSheet } from 'react-native';
import { spacing } from '../../design/tokens/';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: spacing.sm + 1,
  },
  sectionTitle: {
    marginTop: spacing.sm,
  },
  dataCardContainer: {
    flex: 1 / 2,
  },
});
