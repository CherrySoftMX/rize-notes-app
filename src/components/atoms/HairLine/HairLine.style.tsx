import { StyleSheet } from 'react-native';

export default class StyleSheetFactory {
  static getSheet = (color: string) => {
    return StyleSheet.create({
      border: {
        backgroundColor: color,
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
      },
    });
  };
}
