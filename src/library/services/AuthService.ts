import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authConstants } from '../constants/auth';

export class AuthService {
  private static instance: AuthService;
  private currentUser: string;

  constructor() {
    this.currentUser = '';
  }

  public async initiateApp(user: any) {
    const storedUserId = await this.getUserInStorage();
    if (user) {
      this.startAppOnline(user.uid, storedUserId);
      return user.uid;
    }
    await this.startAppOffline(storedUserId);
    return this.getCurrentUserId();
  }

  private startAppOnline(onlineUserId: string, storedUserId: string) {
    this.goOnline();
    if (onlineUserId === storedUserId) {
      console.log('Los datos estan sincronizados');
      return;
    }
    console.log('Parece que acabas de crear una cuenta nueva');
    console.log('Sincronizando datos offline con la cuenta online...');
    /*
      Proceso de sincronizacion...
    */
  }

  private async startAppOffline(storedUserId: string) {
    this.goOffline();
    if (storedUserId) {
      this.setCurrentUserId(storedUserId);
    } else {
      const newUserId = uuid.v4();
      await AsyncStorage.setItem(
        authConstants.userStorageIdentifier,
        JSON.stringify(newUserId),
      );
      this.setCurrentUserId(`${newUserId}`);
    }
  }

  public async getUserInStorage() {
    const item: any = await AsyncStorage.getItem(
      authConstants.userStorageIdentifier,
    );
    return await JSON.parse(item);
  }

  public getCurrentUserId() {
    return this.currentUser;
  }

  private setCurrentUserId(userId: string) {
    this.currentUser = userId;
  }

  public goOffline() {
    firestore().disableNetwork();
  }

  public goOnline() {
    firestore().enableNetwork();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
}
