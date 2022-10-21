/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { API_URL } from '@env';

import {
  Text,
  SafeAreaView
} from 'react-native';
import TestScreen from './src/screens/TestScreen/TestScreen';


/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  return <TestScreen></TestScreen>;
};

export default App;
