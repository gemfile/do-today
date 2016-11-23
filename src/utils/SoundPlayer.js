/* @flow */

import Sound from 'react-native-sound';

const repeatPlaying = (sound, count, volume) => {
  sound.setVolume(volume).play(success => {
    count -= 1;
    if (success && count > 0) {
      repeatPlaying(sound, count, volume);
    }
  });
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
      repeatPlaying(sound, repeatCount, this.volume);
    }
  }

  setVolume(value: number) {
    this.volume = value;
  }
}

const instance = new SoundPlayer();
export default instance;
