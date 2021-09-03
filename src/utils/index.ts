export const addressTrimMiddle = (s: string) => {
  if (s.length != 42) throw new Error('Invalid address length');
  return s.substr(0, 6) + '...' + s.substr(37, 4);
};