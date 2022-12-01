import { StyleSheet } from 'react-native';
import { fontSize } from '../../design/tokens';

export const styles = StyleSheet.create({
  folderContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  folderContentContainer: {
    padding: 15,
  },
  folderContent: {
    fontSize: fontSize.lg,
    marginBottom: 10,
  },
  folderContentLength: {
    alignSelf: 'flex-end',
  },
  folderName: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
