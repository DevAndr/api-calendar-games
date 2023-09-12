import { cryptoRandomStringAsync } from 'crypto-random-string-es5';
export const generateCodeConfirm = async (): Promise<string> =>
  cryptoRandomStringAsync({
    length: 6,
    type: 'numeric',
  });
