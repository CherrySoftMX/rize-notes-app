import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigation } from '@molecules/BottomTopNavigation';
import { SearchBar } from '@molecules/SearchBar';
import { MenuProvider } from 'react-native-popup-menu';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import { Text } from 'react-native';

const App = () => {
  const [user, setUser] = useState('');
  const onAuthStateChanged = async (user: any) => {
    if (user) {
      // El usuario esta logeado
      console.log('Logeado');
      console.log(user);
      firestore().enableNetwork();
      console.log('Id de usuario online');
      console.log(user.uid);

      const response: any = await AsyncStorage.getItem('userId');
      const userId = await JSON.parse(response);
      console.log('ID almacenado localmente:');
      console.log(userId);

      if (user.uid === userId) {
        console.log('Los datos locales estan sincronizados con online');
      } else {
        console.log('Parece que acabas de crear una cuenta nueva');
        console.log('Sincronizando datos offline con la cuenta online...');
        /*
          Proceso de sincronizacion
          1- Obtener docs almacenados con el id local
          2- Moverlos a la cuenta nueva
          3- Reemplazar id del AsyncStorage por el id de la cuenta online
        */
      }
    } else {
      // El usuario no esta logeado
      console.log('No estas  logeado');
      firestore().disableNetwork();

      const response: any = await AsyncStorage.getItem('userId');
      const userId = await JSON.parse(response);

      if (userId) {
        console.log('Existe un ID almacenado');
        console.log(userId);
        setUser(userId);
      } else {
        console.log('Parece que es la primera vez que entras a la app');
        const newUserId = uuid.v4();
        await AsyncStorage.setItem('userId', JSON.stringify(newUserId));

        console.log('Tu id de usuario nuevo offline es:');
        console.log(newUserId);
        setUser(`${newUserId}`);
      }
    }
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <MenuProvider>
      <NavigationContainer>
        {user && (
          <>
            <SearchBar />
            <BottomTabNavigation />
          </>
        )}
        {!user && <Text>Cargando...</Text>}
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;
