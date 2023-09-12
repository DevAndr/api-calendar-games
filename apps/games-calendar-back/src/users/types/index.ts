export interface IUser {
  email: string;
  hashedPassword: string;
  confirmationCode: string;
  isConfirm: boolean;
}

export type ThinUser = Omit<IUser, 'hashedPassword' | 'confirmationCode'>;
