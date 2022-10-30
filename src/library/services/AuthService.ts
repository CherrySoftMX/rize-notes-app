import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authConstants } from '../constants/auth';

/**
 * A collection of methods to manage app auth.
 */
class AuthService {
  private static instance: AuthService;
  private currentUser: string;

  constructor() {
    this.currentUser = '';
  }

  /**
   * Initializes app current user offline or online according to the param.
   *
   * @param user - A user object given by Firebase/Auth onAuthStateChanged method.
   * @returns The id of the current user.
   */
  public async initiateApp(user: any) {
    const storedUserId = await this.getUserInStorage();
    if (user) {
      this.startAppOnline(user.uid, storedUserId);
      return user.uid;
    }
    await this.startAppOffline(storedUserId);
    return this.getCurrentUserId();
  }

  /**
   * Initializes the app in online mode.
   *
   * @param onlineUserId - Uid of the user object given by Firebase/Auth
   * @param storedUserId - Id of the user stored in local Async Storage
   *
   * @alpha
   */
  private startAppOnline(onlineUserId: string, storedUserId: string) {
    this.goOnline();
    if (onlineUserId === storedUserId) {
      console.log('Los datos estan sincronizados');
      return;
    }
    console.log('Parece que acabas de crear una cuenta nueva');
    console.log('Sincronizando datos offline con la cuenta online...');
    /* Proceso de sincronizacion... */
  }

  /**
   * Initialized the app in offline mode
   *
   * @param storedUserId - Id of the user stored in local Async Storage
   */
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

  /**
   * Returns the user ID stored in Async Storage.
   */
  public async getUserInStorage() {
    const item: any = await AsyncStorage.getItem(
      authConstants.userStorageIdentifier,
    );
    return await JSON.parse(item);
  }

  /**
   * Returns the current user ID.
   */
  public getCurrentUserId() {
    return this.currentUser;
  }

  /**
   * Sets the current user ID.
   *
   * @param userId
   */
  private setCurrentUserId(userId: string) {
    this.currentUser = userId;
  }

  /**
   * Disables Firestore network connection.
   */
  public goOffline() {
    firestore().disableNetwork();
  }

  /**
   * Enables Firestore network connection.
   */
  public goOnline() {
    firestore().enableNetwork();
  }

  /**
   * Singleton function.
   *
   * @returns An instance of {@link AuthService}.
   */
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
}

const auth = AuthService.getInstance();

export { auth };
