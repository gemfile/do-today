/* @flow */

const jsonEqual = (a: any, b: any) => {
  return JSON.stringify(a) === JSON.stringify(b);
}

export { jsonEqual };
