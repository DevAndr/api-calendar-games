export class CreateUserDto {
  email: string;
  hashedPassword: string;
  confirmationCode: number;
}
