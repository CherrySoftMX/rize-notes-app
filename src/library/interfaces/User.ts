export interface UserRequest {
  email: string;
  password: string;
}

export interface FirebaseUser {
  uid: string;
  email: string;
}

export interface LocalUser {
  email: string;
  id: string;
  isLogged: boolean;
}
