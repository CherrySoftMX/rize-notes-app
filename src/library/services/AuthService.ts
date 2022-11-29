import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authConstants } from '../constants/auth';
import { UserRequest, LocalUser, FirebaseUser } from 'library/interfaces/User';
import firebaseAuth from '@react-native-firebase/auth';
import {
  getFolders,
  uploadAndChangeUserOfFolders,
  deleteFolderById,
} from './FoldersService';
import {
  getNotes,
  uploadAndChangeUserOfNotes,
  deleteNoteById,
} from './NotesService';

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
      return this.startAppOnline(user);
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
   * @alpha
   */
  private async startAppOnline(onlineUser: FirebaseUser) {
    this.goOnline();
    const user = {
      email: onlineUser.email,
      id: onlineUser.uid,
      isLogged: true,
    };
    this.setUserData(user);
    await AsyncStorage.setItem(
      authConstants.userStorageIdentifier,
      JSON.stringify(onlineUser.uid),
    );
    return user;
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
    const currentUserFolders = await getFolders();
    const currentUserNotes = await getNotes();

    const { user } = await firebaseAuth().createUserWithEmailAndPassword(
      email,
      password,
    );

    if (user) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .set({ email, id: user.uid })
        .catch((err: any) => console.log(err));

      await uploadAndChangeUserOfFolders(user.uid, currentUserFolders);
      await uploadAndChangeUserOfNotes(user.uid, currentUserNotes);
    }
  }

  /**
   * Signs a user into its account.
   *
   * @param param0 - The data of the user to login
   */
  public async loginUser({ email, password }: UserRequest) {
    let status = {
      success: true,
      error: '',
    };

    const previousUser = this.getUserData();
    const previousUserFolders = await getFolders();
    const previousUserNotes = await getNotes();

    const logData = await firebaseAuth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        status = { success: false, error: error.code };
      });

    if (!logData) {
      console.log('Error al iniciar sesión');
      return status;
    }
    const user = logData.user as FirebaseUser;

    // Synchronize data of offline and online user
    if (!previousUser.isLogged && previousUser.id === logData.user.uid) {
      const onlineUserFolders = await getFolders();
      const onlineUserNotes = await getNotes();

      // Delete online folders which have been deleted offline.
      const previousUserFoldersIds = previousUserFolders.map(f => f.id);
      const deletedFolders = onlineUserFolders.filter(
        f => !previousUserFoldersIds.includes(f.id),
      );
      try {
        await Promise.all(deletedFolders.map(f => deleteFolderById(f.id)));
      } catch (err) {
        console.log('Error al sincronizar carpetas borradas');
        console.log(err);
      }

      // Delete online notes which have been deleted offline
      const previousUserNotesIds = previousUserNotes.map(n => n.id);
      const deletedNotes = onlineUserNotes.filter(
        n => !previousUserNotesIds.includes(n.id),
      );
      try {
        await Promise.all(deletedNotes.map(n => deleteNoteById(n.id, true)));
      } catch (err) {
        console.log('Error al sincronizar notas borradas');
        console.log(err);
      }

      await uploadAndChangeUserOfFolders(user.uid, previousUserFolders);
      await uploadAndChangeUserOfNotes(user.uid, previousUserNotes);
    }

    return status;
  }

  /**
   * Logs out the current user
   * @beta
   */
  public async logout() {
    const onlineUserFolders = await getFolders();
    const onlineUserNotes = await getNotes();
    const user = this.getCurrentUserId();

    console.log('Sign out');
    await firebaseAuth().signOut();

    const offlineUserFolders = await getFolders();
    const offlineUserNotes = await getNotes();

    // Delete offline folders which have been deleted online.
    const onlineUserFoldersIds = onlineUserFolders.map(f => f.id);
    const deletedFolders = offlineUserFolders.filter(
      f => !onlineUserFoldersIds.includes(f.id),
    );
    try {
      await Promise.all(deletedFolders.map(f => deleteFolderById(f.id)));
    } catch (err) {
      console.log('Error al sincronizar carpetas borradas');
      console.log(err);
    }

    // Delete offline notes which have been deleted online
    const onlineUserNotesIds = onlineUserNotes.map(n => n.id);
    const deletedNotes = offlineUserNotes.filter(
      n => !onlineUserNotesIds.includes(n.id),
    );
    try {
      await Promise.all(deletedNotes.map(n => deleteNoteById(n.id, true)));
    } catch (err) {
      console.log('Error al sincronizar notas borradas');
      console.log(err);
    }

    await uploadAndChangeUserOfFolders(user, onlineUserFolders);
    await uploadAndChangeUserOfNotes(user, onlineUserNotes);
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
