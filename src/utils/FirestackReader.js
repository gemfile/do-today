/* @flow */

import Firestack from 'react-native-firestack';

class FirestackReader {
  callbacks: [];
  firestack: Firestack;

  constructor() {
    this.callbacks = [];
    this.firestack = new Firestack({
      debug: true,
    });

    this.firestack.onReady( () => {
      this.firestack.database.setPersistence(true).then(
        () => {
          this.onReady();
        }
      );
    } );
  }

  listenToReady( callback: Function ) {
    this.callbacks.push(callback);
  }

  onReady() {
    for (let callback of this.callbacks) {
      callback(this.firestack);
    }
  }
}

const instance = new FirestackReader();
export default instance;
