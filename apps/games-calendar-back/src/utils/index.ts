import { cryptoRandomStringAsync } from 'crypto-random-string-es5';
export const generateCodeConfirm = async (): Promise<number> =>
  Number(
    cryptoRandomStringAsync({
      length: 6,
      type: 'numeric',
    }),
  );
