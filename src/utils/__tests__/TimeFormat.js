import { secondsToMinutes, twoDigit } from '../TimeFormat';

describe('how to use the TimeFomat', () => {
  it('90 seconds equals 1 minute 30 seconds', () => {
    expect(secondsToMinutes(90)).toBe('1:30')
  });

  it('1 digit will change to 2 digit', () => {
    expect(twoDigit(0)).toBe('00');
  });
});
