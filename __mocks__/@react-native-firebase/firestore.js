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
    where: jest.fn(),
  })),
});

mockFirestore.FieldValue = {
  arrayUnion: jest.fn(),
};

export default mockFirestore;
