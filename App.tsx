import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';
import { Loader } from './Loader';

const App = () => {
  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <Loader />
      </RecoilRoot>
    </SafeAreaProvider>
  );
};

export default App;
