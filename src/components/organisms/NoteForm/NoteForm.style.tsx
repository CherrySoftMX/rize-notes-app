import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEFEFE',
    width: '80%',
    height: 'auto',
    borderRadius: 10,
    marginTop: 25,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  label: {
    textAlign: 'center',
  },
  noteDetails: {
    marginTop: 10,
  },
  dropdownText: {
    fontSize: 16,
    textAlign: 'left',
  },
  inputWithBorder: {
    backgroundColor: '#FEFEFE',
    borderBottomColor: '#0A8877',
    borderBottomWidth: 1,
    flex: 1,
  },
});
