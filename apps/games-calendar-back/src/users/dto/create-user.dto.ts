import { IUser } from '@server/users/types';
export class CreateUserDto implements IUser {
  confirmationCode: string;
  email: string;
  hashedPassword: string;
  isConfirm: boolean;
}
