import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authConstants } from '../constants/auth';
import { UserRequest, LocalUser, FirebaseUser } from 'library/interfaces/User';
import firebaseAuth from '@react-native-firebase/auth';

/**
 * A collection of methods to manage app auth.
 */
class AuthService {
  private static instance: AuthService;
  private userData: LocalUser;

  constructor() {
    this.userData = {
      email: '',
      id: '',
      isLogged: false,
    };
  }

  /**
   * Initializes app current user offline or online according to the param.
   *
   * @param user - A user object given by Firebase/Auth onAuthStateChanged method.
   * @returns The id of the current user.
   */
  public async initiateApp(user: FirebaseUser) {
    const storedUserId = await this.getUserInStorage();
    if (user) {
      return this.startAppOnline(user, storedUserId);
    }
    await this.startAppOffline(storedUserId);
    return this.getUserData();
  }

  /**
   * Initializes the app in online mode.
   * Currently only loads the user data stored in the cloud.
   *
   * @param onlineUserId - Uid of the user object given by Firebase/Auth
   * @param storedUserId - Id of the user stored in local Async Storage
   *
   * @alpha - Currently when you register a new account, the
   * folders and notes created offline won't be uploaded to the cloud
   * and you will not see them anymore, but, if you create new folders
   * and notes and you logout, then you will see the folders and notes
   * you created offline PLUS the folders and notes you created online.
   */
  private async startAppOnline(
    onlineUser: FirebaseUser,
    offlineUserId: string,
  ) {
    this.goOnline(); // Should be goOnline()
    const user = {
      email: onlineUser.email,
      id: offlineUserId,
      isLogged: true,
    };
    this.setUserData(user); // Should be onlineUser.uid but cloud sync isn't implemented yet
    /*await AsyncStorage.setItem(
      authConstants.userStorageIdentifier,
      JSON.stringify(onlineUser.uid),
    );*/ // Should store the uid but currently for development the stored id won't change.
    return user; // Should be onlineUser.uid but cloud sync isn't implemented yet
  }

  /**
   * Initialized the app in offline mode
   *
   * @param storedUserId - Id of the user stored in local Async Storage
   */
  private async startAppOffline(storedUserId: string) {
    this.goOffline();
    const user = {
      id: '',
      email: '',
      isLogged: false,
    };
    if (storedUserId) {
      this.setUserData({ ...user, id: storedUserId });
    } else {
      const newUserId = `${uuid.v4()}`;
      await AsyncStorage.setItem(
        authConstants.userStorageIdentifier,
        JSON.stringify(newUserId),
      );
      this.setUserData({ ...user, id: newUserId });
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
  public async registerUser({ email, password }: UserRequest) {
    const { user } = await firebaseAuth().createUserWithEmailAndPassword(
      email,
      password,
    );

    firestore()
      .collection('users')
      .doc(user.uid)
      .set({ email, id: user.uid })
      .catch((err: any) => console.log(err));
  }

  /**
   * Logs out the current user
   */
  public logout() {
    console.log('Cerrando sesion');
    firebaseAuth().signOut();
  }

  /**
   * Returns the current user ID.
   */
  public getCurrentUserId() {
    return this.userData.id;
  }

  /**
   * Returns the email of the current user.
   */
  public getCurrentUserEmail() {
    return this.userData.email;
  }

  /**
   * Sets the data of the current user
   *
   * @param data
   */
  private setUserData(data: LocalUser) {
    this.userData = data;
  }

  /**
   * Returns the data of the current user
   */
  public getUserData() {
    return this.userData;
  }

  /**
   * Returns the login status of the current user
   */
  public isUserLogged() {
    return this.userData.isLogged;
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
