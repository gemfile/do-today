import { jsonEqual } from '../JsonEqual';

describe('how to use the JsonEqual', () => {
  it('is comparing a and b by json', () => {
    expect(
      jsonEqual(
        {a:'hi', b:0, c:[0, 1, 2]},
        {a:'hi', b:0, c:[0, 1]}
      )
    ).toBe(false);
  });
});
