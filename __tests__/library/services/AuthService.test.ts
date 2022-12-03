import { AuthService } from '../../../src/library/services/AuthService';

describe('Test for Auth service', () => {
  beforeAll(() => {
    const defaultUserStoredId = 'user1';

    const mockGetUserInStorage = jest.spyOn(
      AuthService.prototype as any,
      'getUserInStorage',
    );
    mockGetUserInStorage.mockImplementation(() =>
      Promise.resolve(defaultUserStoredId),
    );
  });

  it('Should start the app online', async () => {
    const service = new AuthService();
    const user = {
      uid: 'abcd1',
    };

    const mockStartAppOnline = jest.spyOn(
      AuthService.prototype as any,
      'startAppOnline',
    );
    mockStartAppOnline.mockImplementation(() => {});

    const userId = await service.initiateApp(user);

    expect(mockStartAppOnline).toHaveBeenCalled();
    expect(mockStartAppOnline).toHaveBeenCalledWith(user);
  });

  it('Should start the app offline', async () => {
    const service = new AuthService();
    const user = null;
    const localUser = 'user1';

    const mockStartAppOffline = jest.spyOn(
      AuthService.prototype as any,
      'startAppOffline',
    );
    mockStartAppOffline.mockImplementation(() => {});

    service.getCurrentUserId = jest.fn(() => localUser);

    const userId = await service.initiateApp(user);

    expect(mockStartAppOffline).toHaveBeenCalled();
    expect(mockStartAppOffline).toHaveBeenCalledWith(localUser);
  });
});
