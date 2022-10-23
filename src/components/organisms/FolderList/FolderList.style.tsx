import { Dimensions, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width - 40;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: windowWidth / 2,
  },
  listItem: {
    width: '50%',
  },
});
