/* @flow */

import { AsyncStorage } from 'react-native';

class LocalStorage {
  async setItem(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  }

  async getItem(key: string, onGetItem: (item: any) => void) {
    try {
      const value = await AsyncStorage.getItem(key);
      onGetItem(JSON.parse(value));
    } catch (error) {
      console.log(error);
    }
  }
}

const instance = new LocalStorage();
export default instance;
