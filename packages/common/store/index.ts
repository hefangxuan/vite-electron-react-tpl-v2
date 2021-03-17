import Store from 'electron-store';

// Store.initRenderer();

export const globalConfig = new Store({
  name: 'globalConfig',
});

export const userStore = new Store({ name: 'users' });

export const TOKEN = 'token';

export const USER_INFO = '@user/info';
