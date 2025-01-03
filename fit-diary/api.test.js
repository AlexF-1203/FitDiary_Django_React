import MockAdapter from 'axios-mock-adapter';
import api, { userAPI, trackerAPI } from './src/services/api';

describe('API Tests', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(api);
    localStorage.clear();
  });

  afterEach(() => {
    mock.reset();
  });

  // Test User API
  describe('User API', () => {
    test('register', async () => {
      const userData = { email: 'test@test.com', password: 'password' };
      mock.onPost('/register/').reply(201, userData);
      
      const response = await userAPI.register(userData);
      expect(response.data).toEqual(userData);
    });

    test('login', async () => {
      const credentials = { email: 'test@test.com', password: 'password' };
      mock.onPost('/login/').reply(200, { token: 'fake-token' });
      
      const response = await userAPI.login(credentials);
      expect(response.data.token).toBeDefined();
    });
  });

  // Test Tracker API
  describe('Tracker API', () => {
    test('getAll', async () => {
      const trackers = [{ id: 1, muscle: 'Biceps' }];
      mock.onGet('/trackers/').reply(200, trackers);
      
      const response = await trackerAPI.getAll();
      expect(response.data).toEqual(trackers);
    });

    test('create', async () => {
      const tracker = { muscle: 'Biceps', performance: 10 };
      mock.onPost('/trackers/').reply(201, tracker);
      
      const response = await trackerAPI.create(tracker);
      expect(response.data).toEqual(tracker);
    });
  });

  // Test Auth Interceptor
  test('interceptor adds auth token', async () => {
    localStorage.setItem('token', 'test-token');
    mock.onGet('/trackers/').reply(config => {
      expect(config.headers.Authorization).toBe('Token test-token');
      return [200, []];
    });

    await trackerAPI.getAll();
  });
});