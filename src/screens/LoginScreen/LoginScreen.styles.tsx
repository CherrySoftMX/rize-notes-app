import { StyleSheet } from 'react-native';
import { colors } from '../../design/tokens/colors';

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
  },
  title1: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#7E7D84',
  },
  title2: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#7E7D84',
    marginBottom: 35,
  },
  input: {
    backgroundColor: colors.pureWhite,
    marginTop: 5,
  },
  stack: {
    width: '100%',
  },
  buttonLogin: {
    width: 135,
    alignSelf: 'center',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: '#7E7D84',
    alignSelf: 'center',
    marginVertical: 5,
  },
});
