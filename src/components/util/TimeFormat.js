const secondsToMinutes = (seconds) => {
  const minute = Math.floor(seconds / 60);
  const second = seconds % 60;
  return `${minute}:${twoDigit(second)}`;
};

const twoDigit = (number) => {
  let result = '';
  if (number < 10) {
    result += '0';
  }
  result += number;
  return result;
};

export { secondsToMinutes, twoDigit };
