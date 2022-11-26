import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authConstants } from '../constants/auth';
import { UserRequest, User } from 'library/interfaces/User';
import firebaseAuth from '@react-native-firebase/auth';

/**
 * A collection of methods to manage app auth.
 */
class AuthService {
  private static instance: AuthService;
  private currentUser: string;
  private isOnline: boolean;
  private userData: User;

  constructor() {
    this.currentUser = '';
    this.isOnline = false;
    this.userData = {
      email: '',
      id: '',
      uid: '',
    };
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
      return this.startAppOnline(user, storedUserId);
    }
    await this.startAppOffline(storedUserId);
    return this.getCurrentUserId();
  }

  /**
   * Initializes the app in online mode.
   * Currently only loads the user data stored in the cloud.
   *
   * @param onlineUserId - Uid of the user object given by Firebase/Auth
   * @param storedUserId - Id of the user stored in local Async Storage
   *
   * @alpha
   */
  private async startAppOnline(onlineUser: User, offlineUserId: string) {
    this.setCurrentUserId(offlineUserId); // Should be onlineUser.uid but cloud sync isn't implemented yet
    this.setIsOnline(true);
    this.goOffline();
    this.setUserData(onlineUser);
    return offlineUserId;
  }

  /**
   * Initialized the app in offline mode
   *
   * @param storedUserId - Id of the user stored in local Async Storage
   */
  private async startAppOffline(storedUserId: string) {
    this.goOffline();
    this.setIsOnline(false);
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
   * Registers a new user in firebase
   *
   * @param param0 - The data of the user to register
   */
  public async registerUser({ email, password, id }: UserRequest) {
    const { user } = await firebaseAuth().createUserWithEmailAndPassword(
      email,
      password,
    );

    firestore()
      .collection('users')
      .doc(user.uid)
      .set({ email, id, uid: user.uid })
      .catch((err: any) => console.log(err));
  }

  /**
   * Logs out the current user
   */
  public logout() {
    console.log('Cerrando sesion');
    this.setIsOnline(false);
    firebaseAuth().signOut();
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
   * Sets the data of the current user
   *
   * @param data
   */
  private setUserData(data: User) {
    this.userData = data;
  }

  /**
   * Returns the data of the current user
   */
  public getUserData() {
    return {
      isLogged: this.isOnline,
      user: this.userData,
    };
  }

  /**
   * Sets if the user is logged online
   *
   * @param isOnline
   */
  private setIsOnline(isOnline: boolean) {
    this.isOnline = isOnline;
  }

  /**
   * Returns the login status of the current user
   */
  public isUserLogged() {
    return this.isOnline;
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

export { auth, AuthService };
