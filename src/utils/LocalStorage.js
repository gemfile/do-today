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
      const jsonValue = await AsyncStorage.getItem(key)
      const value = JSON.parse(jsonValue);
      if (onGetItem) {
        onGetItem(value);
      }
      return value;
    } catch (error) {
      console.log(error);
    }
  }
}

const instance = new LocalStorage();
export default instance;
