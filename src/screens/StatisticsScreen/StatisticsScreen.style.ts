import { StyleSheet } from 'react-native';
import { spacing } from '../../design/tokens/';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  headerContainer: {
    marginBottom: spacing.xm,
  },
  sectionTitle: {
    marginTop: spacing.sm,
  },
  dataCardContainer: {
    flex: 1 / 2,
  },
});
