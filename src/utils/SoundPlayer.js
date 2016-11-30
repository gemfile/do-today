/* @flow */

import Sound from 'react-native-sound';

const repeat = async (sound, count, volume) => {
  while (count > 0) {
    await new Promise( resolve => sound.setVolume(volume).play(resolve) );
    count -= 1;
  }
};

class SoundPlayer {
  soundMap: { [name:string]: Sound };
  volume: number;

  constructor() {
    this.register();

    this.volume = 1;
  }

  register() {
    this.soundMap = {
      tick: new Sound('pomodoro_tick.mp3', Sound.MAIN_BUNDLE),
      stop: new Sound('pomodoro_turn.mp3', Sound.MAIN_BUNDLE),
      ring: new Sound('pomodoro_ring.mp3', Sound.MAIN_BUNDLE),
    };
  }

  play(name: string, repeatCount: number = 1) {
    const sound = this.soundMap[name];
    if (this.volume !== 0 && sound) {
      repeat(sound, repeatCount, this.volume);
    }
  }

  setVolume(value: number) {
    this.volume = value;
  }
}

const instance = new SoundPlayer();
export default instance;
