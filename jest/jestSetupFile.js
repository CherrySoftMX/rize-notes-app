// import mockFirestore from '../__mocks__/@react-native-firebase/firestore';

jest.mock('@react-native-async-storage/async-storage', () => {
  return () => ({
    getItem: jest.fn(),
  });
});

jest.mock('@react-native-firebase/auth', () => {
  const mockAuth = () => ({
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  });
  return mockAuth;
});

jest.mock('@react-native-firebase/firestore', () => {
  const mockFirestore = () => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(() => ({
          catch: jest.fn(),
        })),
        update: jest.fn(() => ({
          catch: jest.fn(),
        })),
        get: jest.fn(() => Promise.resolve({})),
      })),
      where: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({})),
      })),
    })),
  });

  mockFirestore.FieldValue = {
    arrayUnion: jest.fn(),
  };

  return mockFirestore;
});
