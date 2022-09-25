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


/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Text>Hello Voctor, {API_URL}</Text>
    </SafeAreaView>
  );
};

export default App;
