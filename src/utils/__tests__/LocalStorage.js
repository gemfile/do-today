import AsyncStorage from '../__mocks__/AsyncStorage';
jest.mock('AsyncStorage', () => {
  return new AsyncStorage();
});

import FirstLocalStorage from '../LocalStorage';
import SecondLocalStorage from '../LocalStorage';

describe('how to use the LocalStorage', () => {
  it('has only one instance.', () => {
    expect(FirstLocalStorage).toBe(SecondLocalStorage)
  });

  it('has lemon in it after setItem', async () => {
    await FirstLocalStorage.setItem('fruits', {lemon: 1, apple: 2, orange: 3});
    return FirstLocalStorage.getItem('fruits').then(fruits => {
      expect(fruits.lemon).toBe(1);
    });
  });

  it('has nothing after clear', async () => {
    await FirstLocalStorage.clear();
    return FirstLocalStorage.getItem('fruits').then(fruits => {
      expect(fruits).toBe(null);
    });
  });
});
